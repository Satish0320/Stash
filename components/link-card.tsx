"use client";

import { Link as LinkModel } from "@prisma/client";
import { ExternalLink, Twitter, Youtube, Trash2, Heart, Copy, Pencil, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface LinkCardProps {
  link: LinkModel;
}

export function LinkCard({ link }: LinkCardProps) {
  const router = useRouter();
  
  // State
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(link.isFavorite);
  const [isArchived, setIsArchived] = useState(link.isArchived); // Track if trashed
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title || "");
  const [isSaving, setIsSaving] = useState(false);

  const meta = link.metadata as any;

  // 1. Soft Delete (Move to Trash)
  const handleSoftDelete = async () => {
    setIsArchived(true); // Optimistic UI update
    try {
      await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isArchived: true }),
      });
      router.refresh();
    } catch {
      setIsArchived(false); // Revert on error
    }
  };

  // 2. Restore (Remove from Trash)
  const handleRestore = async () => {
    setIsArchived(false);
    try {
      await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isArchived: false }),
      });
      router.refresh();
    } catch {
      setIsArchived(true);
    }
  };

  // 3. Permanent Delete
  const handlePermanentDelete = async () => {
    if (!confirm("This will permanently delete the link. Are you sure?")) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/links/${link.id}`, { method: "DELETE" });
      router.refresh(); 
    } catch {
      setIsDeleting(false);
    }
  };

  // 4. Toggle Favorite
  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });
      router.refresh();
    } catch {
      setIsFavorite(isFavorite); 
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(link.url);

  const saveEdit = async () => {
    setIsSaving(true);
    try {
      await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: editTitle }),
      });
      setEditTitle(editTitle);
      setIsEditOpen(false);
      router.refresh();
    } catch {
      console.error("Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  if (isDeleting) return null; 

  return (
    <>
      <div className={`break-inside-avoid bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group mb-6 ${isArchived ? "opacity-75 grayscale" : ""}`}>
        
        {/* --- IMAGE AREA --- */}
        {meta?.image ? (
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 group-hover:opacity-95 transition-opacity">
            <img src={meta.image} alt={link.title || ""} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full backdrop-blur-sm z-10 shadow-sm">
              {link.type === 'YOUTUBE' ? <Youtube className="h-4 w-4 text-red-600" /> : 
               link.type === 'TWITTER' ? <Twitter className="h-4 w-4 text-blue-400" /> : 
               <ExternalLink className="h-4 w-4 text-gray-600" />}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 border-b border-gray-100">
             <div className="flex justify-between items-start">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
             </div>
          </div>
        )}

        {/* --- CONTENT AREA --- */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 leading-snug mb-2 line-clamp-2" title={link.title || ""}>
            {link.title || link.url}
          </h3>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-slate-400">
              {new Date(link.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Logic for Trash vs Normal View */}
              {isArchived ? (
                <>
                  <button onClick={handleRestore} className="p-1.5 hover:bg-green-50 hover:text-green-600 rounded-md text-slate-500 transition-colors" title="Restore">
                    <RefreshCcw className="h-4 w-4" />
                  </button>
                  <button onClick={handlePermanentDelete} className="p-1.5 hover:bg-red-50 rounded-md text-slate-500 hover:text-red-600 transition-colors" title="Delete Forever">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditOpen(true)} className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-md text-slate-500 transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={handleCopy} className="p-1.5 hover:bg-gray-100 rounded-md text-slate-500 transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button onClick={toggleFavorite} className="p-1.5 hover:bg-red-50 rounded-md transition-colors">
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-500"}`} />
                  </button>
                  <button onClick={handleSoftDelete} className="p-1.5 hover:bg-red-50 rounded-md text-slate-500 hover:text-red-500 transition-colors" title="Move to Trash">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Modal (Same as before) */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Edit Link</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setIsEditOpen(false)} className="text-sm text-gray-500 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button onClick={saveEdit} disabled={isSaving} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
               {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}