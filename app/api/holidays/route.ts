import { authOption } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getServerComponentsHmrCache } from "next/dist/server/app-render/work-unit-async-storage.external";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest){
    const session = await getServerSession(authOption);

    if (!session || !session.user) {
        return NextResponse.json({ error: "you are not login" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const body = await req.json();
        const {name, Date, description} = body;

        if(!name || !Date || !description){
            return NextResponse.json(
                { error: "you are missing inputs field" },
                { status: 400 }
            )
        }

        const create_holiday = await prisma.holidays.create({
            data:{
                name,
                Date,
                description,
                userId
            },
        })
    } catch (error) {
        return NextResponse.json({
            error: "Error while creating holiday" + error
        }, {
            status:500
        })
    }
}