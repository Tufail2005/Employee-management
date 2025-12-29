import { authOption } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {
    const session = await getServerSession(authOption);

    if (!session || !session.user) {
        return NextResponse.json({ error: "you are not log-IN" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const {
        name,
        phoneNo,
        role,
        empId,
        userType,
        gender,
        email,
        password,
        DOB,
        qualification,
        hireDate,
        address,
        pincode,
        leaves,
        leaveType,
        holidays,
        } = body;

        if (
        !name ||
        !phoneNo ||
        !role ||
        !empId ||
        !userType ||
        !gender ||
        !email ||
        !password ||
        !DOB ||
        !qualification ||
        !hireDate ||
        !address ||
        !pincode ||
        !leaves ||
        !leaveType ||
        !holidays
        ) {
        return NextResponse.json(
            { error: "you are missing inputs field" },
            { status: 400 }
        );}

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (!userExists){
            return NextResponse.json(
            { msg: "employee already exist" },
            { status: 400 }
            );
        }
            
        const create_user = await prisma.user.create({
            data: {
            name,
            phoneNo,
            role,
            empId,
            userType,
            gender,
            email,
            password,
            DOB,
            qualification,
            hireDate,
            address,
            pincode,
            leaves,
            leaveType,
            holidays,
            },
        });
        return NextResponse.json({
            msg: "Employee got created",
        });
        } catch (err) {
        return NextResponse.json({ msg: "Server error" + err }, { status: 500 });
    }
}


export async function GET(req: Request) {

}
