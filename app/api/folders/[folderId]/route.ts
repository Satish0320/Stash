import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const session = await auth();
    const { folderId } = await params;
    const { name } = await req.json(); // Only extract 'name'

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Verify Ownership
    const folderExists = await prisma.folder.findFirst({
      where: { 
        id: folderId,
        userId: session.user.id 
      }
    });

    if (!folderExists) {
      return new NextResponse("Not Found or Forbidden", { status: 404 });
    }

    const folder = await prisma.folder.update({
      where: { id: folderId },
      data: { name } 
    });

    return NextResponse.json(folder);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE: Deletes the folder
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const session = await auth();
    const { folderId } = await params;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Verify Ownership
    const folderExists = await prisma.folder.findFirst({
      where: { 
        id: folderId,
        userId: session.user.id
      }
    });

    if (!folderExists) {
      return new NextResponse("Not Found or Forbidden", { status: 404 });
    }

    // 2. Delete
    await prisma.folder.delete({
      where: { id: folderId },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}