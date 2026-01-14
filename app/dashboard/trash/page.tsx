import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LinkCard } from "@/components/link-card";
import { Trash2 } from "lucide-react";

export default async function TrashPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const links = await prisma.link.findMany({
    where: { 
      userId: session.user?.id,
      isArchived: true // Only trashed items
    },
    orderBy: { updatedAt: "desc" }, // Most recently deleted first
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-lg text-red-600">
           <Trash2 className="h-6 w-6" />
        </div>
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Trash</h1>
           <p className="text-slate-500 text-sm">Items here can be restored or permanently deleted.</p>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
        {links.length === 0 && (
           <div className="col-span-full py-20 text-center text-slate-500">
             Trash is empty.
           </div>
        )}
      </div>
    </div>
  );
}