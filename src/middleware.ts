import { z } from "astro:content";
import { defineMiddleware } from "astro:middleware";
import { jwtParser, logger } from "src";

export const onRequest = defineMiddleware((context, next) => {
    if (context.url.pathname.startsWith('/auth') || context.url.pathname.startsWith('/api/auth')) {
        return next();
    }

    const accessTokenCookie = context.cookies.get('accessToken');
    if(!accessTokenCookie){
        logger.error('Access token not found');
        return context.redirect('/auth/login');
    }

    const accessToken = jwtParser.decode(accessTokenCookie.value);
    if(accessToken === null){
        logger.error('Invalid access token');
        return context.redirect('/auth/login');
    }

    const { success, error, data } = z.number().safeParse(accessToken.userId);
    if(!success){
        logger.error(`Invalid userId in access token: ${error}`);
        return context.redirect('/auth/login');
    }
    
    context.locals.userId = data;
    return next();
});