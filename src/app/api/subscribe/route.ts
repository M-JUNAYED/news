import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    try {
        const reqBody = await req.json();
        const result = await prisma.subscribers.create({ data: reqBody });

        return NextResponse.json({ status: 'success', data: result });
    } catch (e: any) {
        return NextResponse.json({ status: 'Fail', data: e.message });
    } finally {
        await prisma.$disconnect();
    }
}
