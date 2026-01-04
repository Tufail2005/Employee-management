import { authOption } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOption);

  //needed?
  if (!session || !session.user) {
    return NextResponse.json({ error: "you are not log-IN" });
  }

  try {
    const body = await req.json();
    const userId = session.user.id;
    const { name, defaultDays } = body;

    if (!name || !defaultDays) {
      return NextResponse.json(
        { error: "you are missing inputs field" },
        { status: 400 }
      );
    }

    const create_leavesType = await prisma.leaveType.create({
      data: {
        name,
        defaultDays,
        userId,
      },
    });

    return NextResponse.json({
      msg: "leaves types got created",
    });
  } catch (err) {
    return NextResponse.json({ msg: "Server error" + err }, { status: 500 });
  }
}
