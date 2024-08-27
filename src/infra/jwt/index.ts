import jwt from 'jsonwebtoken';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

const INTERNAL_JWT_KEYS = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'];
type JwtContent = Record<string, any>; 

const GOOGLE_JWT_KEYS: (keyof TokenPayload)[] = ['email'];
type GoogleJwtContent = {email: string};

//to-do: unit tests
export default class JwtParser {
    private readonly googleClient = new OAuth2Client();

    constructor(
        private readonly secret: string,
        private readonly expiresIn: string,
        private readonly googleClientId: string,
    ) {}

    private static stripKeys<T>(payload: Record<string, any>, toStrip: string[]): T {
        return Object.entries(payload).reduce((acc, [key, value]) => {
            if(toStrip.includes(key)) {
                return acc;
            }

            // @ts-ignore
            acc[key] = payload[key];
            return acc;
        }, {} as T);
    }

    private static pickKeys<T>(payload: Record<string, any>, toPick: string[]): T {
        return Object.entries(payload).reduce((acc, [key, value]) => {
            if(!toPick.includes(key)) {
                return acc;
            }

            // @ts-ignore
            acc[key] = payload[key];
            return acc;
        }, {} as T);
    }

    encode(payload: Record<string, any>): string {
        return jwt.sign(payload, this.secret, {expiresIn: this.expiresIn});
    }

    decode(token: string): JwtContent | null {
        const payload = jwt.verify(token, this.secret);

        if(!(payload instanceof Object)) {
            return null;
        }

        return JwtParser.stripKeys(payload, INTERNAL_JWT_KEYS);
    }

    validate(token: string): boolean {
        try {
            return !!this.decode(token);
        } catch (e) {
            return false;
        }
    }

    async decodeGoogle(token: string): Promise<[GoogleJwtContent, null] | [null, Error]> {
        let ticket;
        try {
            ticket = await this.googleClient.verifyIdToken({
                idToken: token,
                audience: this.googleClientId,
            })
        } catch (e) {
            return [null, e instanceof Error ? e : new Error(String(e))];
        }
        const payload = ticket.getPayload()

        if(!payload || payload.email === undefined) {
            return [null, new Error(`Invalid payload: ${payload}`)];
        }

        return [JwtParser.pickKeys<GoogleJwtContent>(payload, GOOGLE_JWT_KEYS), null];
    }
}