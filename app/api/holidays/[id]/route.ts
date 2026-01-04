import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const deletedPost = await prisma.holidays.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedPost, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const { name, date, description } = body;

    const updatedPost = await prisma.holidays.update({
      where: {
        id: id,
      },
      data: {
        name,
        date,
        description,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
