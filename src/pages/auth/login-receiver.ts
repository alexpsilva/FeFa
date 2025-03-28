import type { APIRoute } from "astro";
import { z } from "astro:content";

import { urlEncodedToJson } from "@infra/http/urlEncodedToJson";
import { jwtParser, logger, userRepository } from "src/index";

const GoogleSSORedirectRequestBody = z.object({
    g_csrf_token: z.string(),
    credential: z.string(),
})

type GoogleSSORedirectRequestBody = z.infer<typeof GoogleSSORedirectRequestBody>;

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    if (request.headers.get('Content-Type') !== 'application/x-www-form-urlencoded') {
        return new Response('Bad Request', { status: 400 });
    }
    const body = GoogleSSORedirectRequestBody.parse(urlEncodedToJson(await request.text()));
    
    // Validate the Verify the Cross-Site Request Forgery (CSRF) token as specified by Google in the following doc
    // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
    const bodyCsrfToken = body.g_csrf_token;
    const cookieCsrfToken = cookies.get('g_csrf_token');
    if (bodyCsrfToken === undefined || cookieCsrfToken === undefined || bodyCsrfToken !== cookieCsrfToken.value) {
        logger.error(`Invalid CSRF token: ${bodyCsrfToken} !== ${cookieCsrfToken}`);
        return new Response('Forbidden', { status: 403 });
    }
    
    const credential = body.credential;
    const [payload, error] = await jwtParser.decodeGoogle(credential);
    if (error) {
        logger.error(String(error));
        return new Response('Forbidden', { status: 403 });
    }

    const user = await userRepository.findByEmail(payload.email);
    if (!user) {
        logger.error(`Unauthorized email: ${payload.email}`);
        return new Response('Forbidden', { status: 403 });
    }

    const accessToken = jwtParser.encode({
        userId: user.id,
        email: user.email,
    });
    //to-do: This is not properly setting the cookie. Pending further investigation
    cookies.set('accessToken', accessToken, {httpOnly: true, secure: true, path: '/'});

    //to-do: Generate a refresh token, shorten access token expire time
    // and implement a automatic refresh mechanism. This way, we would be
    // able to block a user and prevent it from generating new access tokens
    // without forcing other users to re-authenticate constantly.
    
    return redirect('/');
};