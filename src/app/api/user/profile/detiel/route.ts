import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req:Request) {
    try {
        const id = parseInt(req.headers.get('id') || '0');
        const email = req.headers.get('email') || '0';

        const prisma = new PrismaClient();
        const result = await prisma.user.findUnique({ where: { id: id } });

        return NextResponse.json({ status: "success", data: result });
    } catch (e) {
        return NextResponse.json({ status: "fail", data: e });
    }
}