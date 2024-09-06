import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

export async function GET(req:Request,res:Response) {
    try{
        const prisma=new PrismaClient();
        const result=await prisma.news_list.findMany({
            take:40,
            select:{id:true,title:true,short_des:true,img1:true,img2:true,img3:true,img4:true,createdAt:true}
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}