import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest, NextResponse as NextResponseType } from "next/server";

export async function GET(req: NextRequest, res: NextResponseType) {
    try {
        const prisma = new PrismaClient();

        const { searchParams } = new URL(req.url);
        const postId: number = parseInt(searchParams.get('postId') || '0', 10);

        if (isNaN(postId)) {
            return NextResponse.json({ status: "fail", data: "Invalid postId" });
        }

        const result = await prisma.comments.findMany({
            where: { postId: postId },
            include: {
                user: { select: { firstName: true } }
            }
        });

        return NextResponse.json({ status: "success", data: result });
    } catch (e: any) {
        return NextResponse.json({ status: "fail", data: e.message });
    }
}
