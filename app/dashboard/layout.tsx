// app/dashboard/layout.tsx
import Link from "next/link";
import { LayoutGrid, Folder as FolderIcon, Star, Trash2, LogOut } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { AddLinkModal } from "@/components/add-link-modal";
import { CreateFolderModal } from "@/components/create-folder-modal"; // <--- Import
import { prisma } from "@/lib/prisma"; // <--- Import Prisma

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // FETCH REAL FOLDERS
  const folders = await prisma.folder.findMany({
    where: { userId: session?.user?.id },
    orderBy: { name: "asc" }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        
        <div className="p-6 border-b border-gray-100">
           <h1 className="text-2xl font-bold tracking-tight text-slate-900">Stash.</h1>
        </div>

        <div className="p-4 space-y-1">
          <div className="mb-6">
            <AddLinkModal />
          </div>

          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg">
            <LayoutGrid className="h-4 w-4" /> All Items
          </Link>
          <Link href="/dashboard/favorites" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Star className="h-4 w-4" /> Favorites
          </Link>
          <Link href="/dashboard/trash" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Trash2 className="h-4 w-4" /> Trash
          </Link>
        </div>

        {/* --- DYNAMIC FOLDERS SECTION --- */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Collections</h3>
            <CreateFolderModal /> {/* <--- The Modal Button */}
          </div>
          
          <div className="space-y-1 overflow-y-auto max-h-75 pr-2">
            {folders.length === 0 ? (
              <p className="text-xs text-slate-400 px-3 italic">No collections yet</p>
            ) : (
              folders.map((folder) => (
                <Link 
                  key={folder.id} 
                  href={`/dashboard/folder/${folder.id}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg cursor-pointer group transition-colors"
                >
                  <FolderIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-500" /> 
                  <span className="truncate">{folder.name}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* User Footer */}
        <div className="mt-auto p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
               {session?.user?.name?.[0] || "U"}
             </div>
             <div className="text-sm">
               <p className="font-medium text-slate-900">{session?.user?.name}</p>
               <p className="text-xs text-slate-500 truncate w-32">{session?.user?.email}</p>
             </div>
          </div>
          <form action={async () => {
            "use server";
            await signOut();
          }}>
            <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-600 font-medium px-1">
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}