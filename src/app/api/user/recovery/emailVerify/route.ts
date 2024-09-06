import { SendMail } from "@/utility/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        let prisma = new PrismaClient();
        let { searchParams } = new URL(req.url);
        let email = searchParams.get('email');

        // Check if email is null
        if (!email) {
            return NextResponse.json({ status: 'fail', data: 'Invalid email parameter' });
        }

        const count = await prisma.user.count({ where: { email: email } });
        if (count === 1) {
            let code = Math.floor(100000 + Math.random() * 900000);
            let EmailText = `Your OTP code is ${code}`;
            let EmailSubject = "Next News Verification Code";

            await SendMail(email, EmailText, EmailSubject);
            let result = await prisma.user.update({
                where: { email: email },
                data: { otp: code.toString() }
            });
            return NextResponse.json({ status: 'success', data: result });
        } else {
            return NextResponse.json({ status: 'fail', data: 'User not found' });
        }
    } catch (e: any) {
        return NextResponse.json({ status: 'fail', data: e.message });
    }
}
