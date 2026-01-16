import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LinkCard } from "@/components/link-card";
import { Folder } from "lucide-react";
import { FolderActions } from "@/components/folder-actions"; // <--- Import
import { ShareFolderModal } from "@/components/share-folder-modal";

export default async function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const session = await auth();
  const { folderId } = await params;

  if (!session) redirect("/login");

  const folder = await prisma.folder.findUnique({
    where: { id: folderId, userId: session.user?.id },
  });

  if (!folder) {
    return <div className="text-slate-900 dark:text-white p-8">Folder not found</div>;
  }

  const links = await prisma.link.findMany({
    where: { 
      userId: session.user?.id,
      folderId: folderId,
      isArchived: false
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 dark:border-slate-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                 <Folder className="h-6 w-6" />
             </div>
             <div>
               <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{folder.name}</h1>
               <p className="text-slate-500 dark:text-slate-400 text-sm">{links.length} items collected</p>
             </div>
          </div>

          <div className="flex items-center gap-2">
             <FolderActions folder={folder} /> {/* <--- EDIT/DELETE HERE */}
             <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1"></div>
             <ShareFolderModal folder={folder} />
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}

        {links.length === 0 && (
          <div className="col-span-full py-20 text-center">
             <div className="text-slate-400 dark:text-slate-500 mb-2">This collection is empty.</div>
             <p className="text-sm text-slate-500 dark:text-slate-400">
               Add links and assign them to this folder to see them here.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}