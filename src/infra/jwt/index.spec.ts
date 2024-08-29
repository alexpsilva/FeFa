import jwt from "jsonwebtoken";
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
const jwtMock = jwt as jest.Mocked<typeof jwt>;

import googleAuth from "google-auth-library";
jest.mock('google-auth-library', () => ({
    OAuth2Client: jest.fn(),
}));
const googleAuthMock = googleAuth as jest.Mocked<typeof googleAuth>;

import JwtParser from ".";

describe('JwtParser', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    describe('encode()', () => {
        it('should call the jwt.sign method with the provided secret and expiration', async () => {
            jwtMock.sign.mockImplementation(() => 'token');
            const payload = { userId: 'userId', email: 'email' };

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const encoded = jwtParser.encode(payload);

            expect(jwtMock.sign).toHaveBeenCalledTimes(1);
            expect(jwtMock.sign).toHaveBeenCalledWith(payload, 'secret', { expiresIn: '1h' });
            expect(encoded).toBe('token');
        })

        it('should throw an error if jwt.sign throws an error', async () => {
            jwtMock.sign.mockImplementation(() => { throw new Error('error'); });
            const payload = { userId: 'userId', email: 'email' };

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            expect(() => jwtParser.encode(payload)).toThrow('error');
        })
    })

    describe('decode()', () => {
        it('should call the jwt.verify method with the provided secret', async () => {
            jwtMock.verify.mockImplementation(() => ({ userId: 'userId', email: 'email' }));

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const decoded = jwtParser.decode('token');

            expect(jwtMock.verify).toHaveBeenCalledTimes(1);
            expect(jwtMock.verify).toHaveBeenCalledWith('token', 'secret');
            expect(decoded).toEqual({ userId: 'userId', email: 'email' });
        })

        it('should return null if jwt.verify returns a non-object', async () => {
            jwtMock.verify.mockImplementation(() => 'string');

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const decoded = jwtParser.decode('token');

            expect(jwtMock.verify).toHaveBeenCalledTimes(1);
            expect(jwtMock.verify).toHaveBeenCalledWith('token', 'secret');
            expect(decoded).toBeNull();
        })

        it('should throw an error if jwt.verfiry throws an error', async () => {
            jwtMock.verify.mockImplementation(() => { throw new Error('error'); });

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            expect(() => jwtParser.decode('token')).toThrow('error');
        })

        it('should remove internal keys from the payload', async () => {
            jwtMock.verify.mockImplementation(() => ({ 
                userId: 'userId', 
                email: 'email', 
                iss: 'iss', 
                sub: 'sub', 
                aud: 'aud', 
                exp: 'exp', 
                nbf: 'nbf', 
                iat: 'iat', 
                jti: 'jti',
            }));

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const decoded = jwtParser.decode('token');

            expect(decoded).toEqual({ userId: 'userId', email: 'email' });
        })
    })

    describe('decodeGoogle()', () => {
        it('should call the googleClient.verifyIdToken method with the provided token and googleClientId', async () => {
            const clientMock = {
                verifyIdToken: jest.fn().mockResolvedValue({ 
                    getPayload: () => ({ email: 'email' }) 
                }) as googleAuth.OAuth2Client['verifyIdToken'],
            } as googleAuth.OAuth2Client;
            googleAuthMock.OAuth2Client.mockReturnValue(clientMock);

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const [payload, error] = await jwtParser.decodeGoogle('token');

            expect(googleAuthMock.OAuth2Client).toHaveBeenCalledTimes(1);
            expect(googleAuthMock.OAuth2Client).toHaveBeenCalledWith();
            expect(clientMock.verifyIdToken).toHaveBeenCalledTimes(1);
            expect(clientMock.verifyIdToken).toHaveBeenCalledWith({
                idToken: 'token',
                audience: 'googleClientId',
            });
            expect(payload).toEqual({ email: 'email' });
            expect(error).toBeNull();
        })

        it('should return an error if googleClient.verifyIdToken throws an error', async () => {
            const clientMock = {
                verifyIdToken: jest.fn().mockRejectedValue(new Error('error')) as googleAuth.OAuth2Client['verifyIdToken'],
            } as googleAuth.OAuth2Client;
            googleAuthMock.OAuth2Client.mockReturnValue(clientMock);

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const [payload, error] = await jwtParser.decodeGoogle('token');

            expect(googleAuthMock.OAuth2Client).toHaveBeenCalledTimes(1);
            expect(googleAuthMock.OAuth2Client).toHaveBeenCalledWith();
            expect(clientMock.verifyIdToken).toHaveBeenCalledTimes(1);
            expect(clientMock.verifyIdToken).toHaveBeenCalledWith({
                idToken: 'token',
                audience: 'googleClientId',
            });
            expect(payload).toBeNull();
            expect(error).toEqual(new Error('error'));
        })

        it('should return an error if the received payload does not contain an email', async () => {
            const clientMock = {
                verifyIdToken: jest.fn().mockResolvedValue({ 
                    getPayload: () => ({}) 
                }) as googleAuth.OAuth2Client['verifyIdToken'],
            } as googleAuth.OAuth2Client;
            googleAuthMock.OAuth2Client.mockReturnValue(clientMock);

            const jwtParser = new JwtParser('secret', '1h', 'googleClientId');
            const [payload, error] = await jwtParser.decodeGoogle('token');

            expect(googleAuthMock.OAuth2Client).toHaveBeenCalledTimes(1);
            expect(googleAuthMock.OAuth2Client).toHaveBeenCalledWith();
            expect(clientMock.verifyIdToken).toHaveBeenCalledTimes(1);
            expect(clientMock.verifyIdToken).toHaveBeenCalledWith({
                idToken: 'token',
                audience: 'googleClientId',
            });
            expect(payload).toBeNull();
            expect(error).toBeInstanceOf(Error);
        })
    })
})