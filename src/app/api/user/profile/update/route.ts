import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request, res: Response) {
    try {
        const id = parseInt(req.headers.get('id') || '0');
        
        const reqBody = await req.json();
        const prisma = new PrismaClient();
        
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            return NextResponse.json({ status: "fail", data: "User not found" });
        }

        const result = await prisma.user.update({
            where: { id: id },
            data: reqBody
        });

        return NextResponse.json({ status: "success", data: result });
    } catch (e: any) {
        return NextResponse.json({ status: "fail", data: e.message });
    }
}
