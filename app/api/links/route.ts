import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Fetch all links for the current user
export async function GET() {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(links);
}

// POST: Save a new link
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { url, title, type, metadata, folderId } = body;

    if (!url) return new NextResponse("URL is required", { status: 400 });

    const link = await prisma.link.create({
      data: {
        url,
        title: title || "Untitled Link",
        type,
        metadata: metadata || {},
        userId: session.user.id,
        folderId: folderId && folderId !=="" ? folderId: null
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Save Link Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}