import { prisma } from "@/lib/prisma";
import { LinkCard } from "@/components/link-card"; // Reuse your card!
import { Folder, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PublicFolderPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // 1. Fetch Folder by Slug
  const folder = await prisma.folder.findUnique({
    where: { slug },
    include: { user: true } // Include owner info
  });

  // 2. Security Check
  if (!folder || !folder.isPublic) {
    return notFound(); // 404 if not found or private
  }

  // 3. Fetch Links
  const links = await prisma.link.findMany({
    where: { 
      folderId: folder.id,
      isArchived: false 
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
             Stash.
          </div>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
            Create your own Stash <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Folder Info */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-2xl mb-4 text-blue-600 shadow-sm">
            <Folder className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{folder.name}</h1>
          <p className="text-slate-500">
            Curated by <span className="font-medium text-slate-900">{folder.user.name}</span>
          </p>
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {links.map((link) => (
            // We reuse LinkCard, but we might want to hide edit/delete buttons for public viewers
            // For now, let's just render the card. 
            // NOTE: The LinkCard component checks for ownership inside its own logic via API calls, 
            // so clicking "Delete" here won't work for visitors (API will return 401/403), 
            // but visually we should probably create a "ReadOnlyLinkCard" or pass a prop.
            <div key={link.id} className="break-inside-avoid mb-6">
               <ReadOnlyLinkCard link={link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simple Read-Only Card for Visitors
function ReadOnlyLinkCard({ link }: { link: any }) {
  const meta = link.metadata as any;
  
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
      {meta?.image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img src={meta.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-1">{link.title}</h3>
        <p className="text-xs text-slate-400 truncate">{link.url}</p>
      </div>
    </a>
  );
}