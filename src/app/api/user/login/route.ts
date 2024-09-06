import { CreateToken } from "@/utility/JWTtokenHellper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    let reqBody = await req.json();
    const prisma = new PrismaClient();
    const result:any = await prisma.user.findUnique({ where: reqBody });

    if (!result) { // Check if result is null
      return NextResponse.json({ status: 'Cannot find data', data: result });
    } else {
      // Create a token with an expiration date
      const token = await CreateToken(result.email, result.id);

      const tokenExpiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
      const cookieString = `token=${token};expires=${tokenExpiryDate.toUTCString()}; path=/`;

      return NextResponse.json(
        { status: 'Success', data: token },
        { status: 200, headers: { 'Set-Cookie': cookieString } }
      );
    }
  } catch (e: any) {
    return NextResponse.json({ status: 'Error', message: e.message });
  }
}


export async function GET(req: Request) {
  const tokenExpiryDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // Set expiry date in the past to remove the token
  const cookieString = `token=; expires=${tokenExpiryDate.toUTCString()}; path=/`;

  return NextResponse.redirect(new URL('/', req.url), {
    status: 303,
    headers: {
      'Set-Cookie': cookieString,
    },
  });
}


