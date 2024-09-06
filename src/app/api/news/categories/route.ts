import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url, 'http://localhost'); // Provide a base URL
        const catId = parseInt(searchParams.get('catId') || '0', 10); // Default to 0 if catId is null
        const result = await prisma.news_list.findMany({
            where: { catId: catId },
            select:{id:true,title:true,short_des:true,img1:true,img2:true,img3:true,img4:true}
        });
        return NextResponse.json({ status: 'success', data: result });
    } catch (e: any) {
        return NextResponse.json({ status: 'fail', data: e.message });
    }
}
