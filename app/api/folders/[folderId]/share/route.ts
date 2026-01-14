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
    const { isPublic } = await req.json();

    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const folder = await prisma.folder.update({
      where: { 
        id: folderId,
        userId: session.user.id // Ensure ownership
      },
      data: { isPublic }
    });

    return NextResponse.json(folder);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}