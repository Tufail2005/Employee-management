import { authOption } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
    ) {
    try {
        const { id } = await params;

        const updatedPost = await prisma.leave.update({
        where: {
            id: id,
        },
        data: {
            status:"approved"
        },

    });

    await redis.del("leaves:all");

    return NextResponse.json(updatedPost, { status: 200 });
        } catch (error) {
            return NextResponse.json(
            { error: "Failed to update status" },
            { status: 500 }
            );
        }
}
