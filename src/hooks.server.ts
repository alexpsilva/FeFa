import { z } from 'zod';

import { redirect, type Handle } from '@sveltejs/kit';

import { jwtParser, logger } from '$lib/server';

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/auth')) {
        return await resolve(event);
    }
    
    const accessTokenCookie = event.cookies.get('accessToken');
    if(!accessTokenCookie){
        logger.error('Access token not found');
        return redirect(302, '/auth/login');
    }

    const accessToken = jwtParser.decode(accessTokenCookie);
    if(accessToken === null){
        logger.error('Invalid access token');
        return redirect(302, '/auth/login');
    }

    const { success, error, data } = z.number().safeParse(accessToken.userId);
    if(!success){
        logger.error(`Invalid userId in access token: ${error}`);
        return redirect(302, '/auth/login');
    }
    
    event.locals.userId = data;
    return await resolve(event);
};