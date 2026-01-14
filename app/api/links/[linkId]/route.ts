import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// DELETE: Remove a link permanently
export async function DELETE(
  req: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const session = await auth();
    // Await params (Next.js 15 requirement)
    const { linkId } = await params;

    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    // Verify user owns the link before deleting
    const link = await prisma.link.findUnique({
      where: { id: linkId },
    });

    if (!link || link.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.link.delete({
      where: { id: linkId },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH: Update (Toggle Favorite or Archive)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const session = await auth();
    const { linkId } = await params; 
    const body = await req.json();
    const { isFavorite, isArchived, title } = body;

    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const link = await prisma.link.update({
      where: { 
        id: linkId,
        userId: session.user.id // Ensure ownership
      },
      data: {
        isFavorite: isFavorite !== undefined ? isFavorite : undefined,
        isArchived: isArchived !== undefined ? isArchived : undefined,
        title: title !== undefined ? title : undefined,
      }
    });

    return NextResponse.json(link);
  } catch  {
    return new NextResponse("Internal Error", { status: 500 });
  }
}