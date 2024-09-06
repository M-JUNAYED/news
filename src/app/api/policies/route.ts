import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        let url = new URL(req.url);
        let type:any = url.searchParams.get('type');
        const result = await prisma.policies.findMany({ where: { type: type } });
        return NextResponse.json({ status: 'success', data: result });
    } catch (e: any) {
        return NextResponse.json({ status: 'fail', data: e.message });
    }
}
