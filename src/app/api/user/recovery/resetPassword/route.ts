import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const count = await prisma.user.count({ where:{email:reqBody['email'],otp:reqBody['otp']} });

        if (count === 1) {
            await prisma.user.update({
                where:{email:reqBody['email']},
                data:{otp:"0",password:reqBody['password']}
            })
            return NextResponse.json({ status: 'Success', data: 'Valid OTP code' });
        } else {
            return NextResponse.json({ status: 'Fail', data: 'Invalid OTP code' });
        }
    } catch (e: any) {
        return NextResponse.json({ status: 'Fail', data: e.message });
    } finally {
        await prisma.$disconnect();
    }
}
