import { z } from "zod";

const GoogleSSORedirectRequest = z.object({
    body: z.object({
        g_csrf_token: z.string(),
        credential: z.string(),
    }),
    cookies: z.object({
        g_csrf_token: z.string(),
    }),
})

export {
    GoogleSSORedirectRequest
};

export type GoogleSSORedirectRequest = z.infer<typeof GoogleSSORedirectRequest>;
