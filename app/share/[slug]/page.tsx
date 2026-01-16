import { prisma } from "@/lib/prisma";
import { Folder, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image"; // <--- Import Image component
import { Logo } from "@/components/logo"; // <--- Import your Logo component if you want it here too

export default async function PublicFolderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch Folder by Slug (using the ID stored in slug)
  const folder = await prisma.folder.findUnique({
    where: { id: slug }, // Assuming your route is /share/[id] based on previous context
    include: { user: true }
  });

  // 2. Security Check
  if (!folder || !folder.isPublic) {
    return notFound();
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
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* Public Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
             <Logo className="h-8 w-8" />
             Stash.
          </div>
          <Link href="/" className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2">
            Create your own Stash <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Folder Info */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-5 bg-blue-100 rounded-3xl mb-6 text-blue-600 shadow-sm ring-4 ring-blue-50">
            <Folder className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{folder.name}</h1>
          <p className="text-lg text-slate-500">
            Curated by <span className="font-semibold text-slate-900">{folder.user.name}</span>
          </p>
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {links.map((link) => (
            <div key={link.id} className="break-inside-avoid">
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
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      {meta?.image ? (
        // Added 'relative' class so 'fill' works
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <Image 
            src={meta.image} 
            alt={link.title || "Link preview"} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        // Fallback if no image
        <div className="aspect-video w-full bg-slate-50 flex items-center justify-center text-slate-300">
            <Folder className="h-12 w-12 opacity-20" />
        </div>
      )}
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
            {link.title || link.url}
        </h3>
        <p className="text-xs font-medium text-slate-400 truncate flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            {new URL(link.url).hostname.replace('www.', '')}
        </p>
      </div>
    </a>
  );
}