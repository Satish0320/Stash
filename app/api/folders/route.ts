import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Fetch all folders for current user
export async function GET() {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const folders = await prisma.folder.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" },
    include: { _count: { select: { links: true } } } // Include link count!
  });

  return NextResponse.json(folders);
}

// POST: Create a new folder
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const folder = await prisma.folder.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json(folder);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}