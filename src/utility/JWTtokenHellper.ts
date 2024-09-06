import { jwtVerify, SignJWT } from "jose";

export async function CreateToken(email: string, id: string): Promise<string> {
    const secret = process.env.JWT_SECRET;
    const issuer = process.env.JWT_ISSUER;
    const expirationTime = process.env.JWT_EXPIRATION_TIME || '1h';
    
    if (!secret || !issuer || !expirationTime) {
        throw new Error("Environment variables JWT_SECRET, JWT_ISSUER, or JWT_EXPIRATION_TIME are not set");
    }

    const encodedSecret = new TextEncoder().encode(secret);
    const payload = { email: email, id: id };
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(issuer)
        .setExpirationTime(expirationTime)
        .sign(encodedSecret);
    return token;
}

export async function VerifyToken(token: string): Promise<any> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("Environment variable JWT_SECRET is not set");
    }

    const encodedSecret = new TextEncoder().encode(secret);
    const decoded = await jwtVerify(token, encodedSecret);
    return decoded['payload'];
}
