import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url, 'http://localhost'); // Provide a base URL
        const id:number = parseInt(searchParams.get('id') || '0'); // Default to an empty string if type is null
        const result = await prisma.news_list.findUnique({
            where: { id: id }
        });
        return NextResponse.json({ status: 'success', data: result });
    } catch (e: any) {
        return NextResponse.json({ status: 'fail', data: e.message });
    }
}
