import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request, res: Response) {
    try {
        const reqBody = await req.json();
        reqBody.otp = "0";
        const prisma = new PrismaClient();
        const result = await prisma.user.create({
            data: reqBody
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (e) {
        return NextResponse.json({ status: "fail", data: e });
    }
}
