import { authOption } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";



export async function POST(req: Request) {
  const session = await getServerSession(authOption);

  if (!session || !session.user) {
    return NextResponse.json({ error: "you are not log-IN" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      phoneNo,
      userType,
      gender,
      email,
      password,
      DOB,
      qualification,
      address,
      pincode,
    } = body;

    console.log(body);
    if (
      !name ||
      !phoneNo ||
      !userType ||
      !gender ||
      !email ||
      !password ||
      !DOB ||
      !qualification ||
      !address ||
      !pincode
    ) {
      return NextResponse.json(
        { error: "you are missing inputs field" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists) {
      return NextResponse.json(
        { msg: "employee already exist" },
        { status: 400 }
      );
    }

    const create_user = await prisma.user.create({
      data: {
        ...body,
        phoneNo: parseInt(body.phoneNo, 10),
        pincode: parseInt(body.pincode, 10),
        DOB: new Date(body.DOB),
      },
    });

    await redis.del("employees:all")
  


    return NextResponse.json({
      msg: "Employee got created",
    });
  } catch (err) {
    return NextResponse.json({ msg: "Server error" + err }, { status: 500 });
  }
}
