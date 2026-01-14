import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LinkCard } from "@/components/link-card";
import { Folder } from "lucide-react";
import { ShareFolderModal } from "@/components/share-folder-modal";

export default async function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const session = await auth();
  const { folderId } = await params;

  if (!session) redirect("/login");

  // 1. Fetch the Folder details (to get the name)
  const folder = await prisma.folder.findUnique({
    where: { id: folderId, userId: session.user?.id },
  });

  if (!folder) {
    return <div>Folder not found</div>;
  }

  // 2. Fetch Links ONLY in this folder
  const links = await prisma.link.findMany({
    where: { 
      userId: session.user?.id,
      folderId: folderId,
      isArchived: false // <--- Filter by Folder
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Folder className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{folder.name}</h1>
        </div>
        <p className="text-slate-500 ml-1">{links.length} items collected</p>
        <ShareFolderModal folder={folder} />
      </div>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}

        {links.length === 0 && (
          <div className="col-span-full py-20 text-center">
             <div className="text-slate-400 mb-2">This collection is empty.</div>
             <p className="text-sm text-slate-500">
               Add links and assign them to this folder to see them here.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}