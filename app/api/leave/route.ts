import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "@/auth";
import prisma from "@/lib/prisma";
import { error } from "console";
export default async function POST(req: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "you are not logged in" },
      { status: 400 }
    );
  }

  const userId = session.user.id;
  const body = await req.json();
  const { reason, startDate, endDate, status } = body;

  try {
    if (!reason || !startDate || !endDate || !status) {
      return NextResponse.json(
        { error: "you are missing inputs field" },
        { status: 400 }
      );
    }

    const new_leave = await prisma.leave.create({
      data: {
        reason,
        startDate,
        endDate,
        status,
        userId,
      },
    });

    return NextResponse.json({ msg: "leave is created" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "server error :" + err },
      { status: 500 }
    );
  }
}
