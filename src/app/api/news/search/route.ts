import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url, 'http://localhost'); // Provide a base URL
        const keyword:any = searchParams.get('keyword') || '0'; // Default to an empty string if type is null
        const result = await prisma.news_list.findMany({
            where: {title:{contains: keyword} },
            select:{id:true,title:true,short_des:true,img1:true,img2:true,img3:true,img4:true}
        });
        return NextResponse.json({ status: 'success', data: result });
    } catch (e: any) {
        return NextResponse.json({ status: 'fail', data: e.message });
    }
}
