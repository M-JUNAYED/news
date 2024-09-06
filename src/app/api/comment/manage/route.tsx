import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
      const headerList = headers();
      const id = parseInt(headerList.get('id') || '0', 10);  // Get `id` from the headers
  
      if (isNaN(id)) {
        return NextResponse.json({ status: "fail", data: "Invalid or missing user ID" });
      }
  
      const result = await prisma.comments.findMany({
        where: { userId: id },
        include: {
          news_list: { select: { title: true } }
        }
      });
  
      return NextResponse.json({ status: "success", data: result });
    } catch (e: any) {
      return NextResponse.json({ status: "fail", data: e.message });
    }
  }
export async function POST(req: Request, res: Response) {
    try {
        const headerList = headers();
        const id = parseInt(headerList.get('id') || '0', 10);

        if (isNaN(id)) {
            return NextResponse.json({ status: "fail", data: "Invalid or missing user ID" });
        }

        const reqBody = await req.json();
        reqBody.userId = id;

        const result = await prisma.comments.create({
            data: reqBody
        });

        return NextResponse.json({ status: "success", data: result });
    } catch (e: any) {
        return NextResponse.json({ status: "fail", data: e.message });
    }
}

export async function DELETE(req: Request, res: Response) {
    try {
        const headerList = headers();
        const user_id = parseInt(headerList.get('id') || '0', 10);

        if (isNaN(user_id)) {
            return NextResponse.json({ status: "fail", data: "Invalid or missing user ID" });
        }

        const reqBody = await req.json();
        const result = await prisma.comments.deleteMany({
            where: {
                AND: [
                    { userId: user_id },
                    { id: parseInt(reqBody['id'], 10) },
                ],
            },
        });

        return NextResponse.json({ status: "success", data: result });
    } catch (e: any) {
        return NextResponse.json({ status: "fail", data: e.message });
    }
}
