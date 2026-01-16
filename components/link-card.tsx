"use client";

import { Link as LinkModel } from "@prisma/client";
import { ExternalLink, Twitter, Youtube, Trash2, Heart, Copy, Pencil, Check, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner"; // Added toast for better feedback

interface LinkCardProps {
  link: LinkModel;
}

export function LinkCard({ link }: LinkCardProps) {
  const router = useRouter();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(link.isFavorite);
  const [isArchived, setIsArchived] = useState(link.isArchived);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title || "");
  const [isSaving, setIsSaving] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  // Robust parsing of metadata
  const getMeta = () => {
    try {
      if (!link.metadata) return {};
      if (typeof link.metadata === 'string') return JSON.parse(link.metadata);
      return link.metadata as { image?: string; description?: string };
    } catch {
      return {};
    }
  };
  const meta = getMeta();

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setIsCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSoftDelete = async () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (isArchived) {
        // PERMANENT DELETE
        await fetch(`/api/links/${link.id}`, { method: "DELETE" });
        toast.success("Permanently deleted");
      } else {
        // SOFT DELETE (ARCHIVE)
        await fetch(`/api/links/${link.id}`, {
          method: "PATCH",
          body: JSON.stringify({ isArchived: true }),
        });
        setIsArchived(true);
        toast.success("Moved to Trash");
      }
      router.refresh();
      setShowDeleteDialog(false);
    } catch {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRestore = async () => {
    // Optimistic update
    setIsArchived(false);
    try {
      await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isArchived: false }),
      });
      toast.success("Restored from Trash");
      router.refresh();
    } catch {
      setIsArchived(true); // Revert if failed
      toast.error("Failed to restore");
    }
  };

  const toggleFavorite = async () => {
    // Optimistic update
    const newState = !isFavorite;
    setIsFavorite(newState);
    try {
      await fetch(`/api/links/${link.id}/favorite`, {
        method: "PATCH",
        body: JSON.stringify({ isFavorite: newState }),
      });
      router.refresh();
      toast.success(newState ? "Added to favorites" : "Removed from favorites");
    } catch {
      setIsFavorite(!newState); 
      toast.error("Failed to update favorite");
    }
  };

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
      toast.success("Link updated");
    } catch {
      toast.error("Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className={`break-inside-avoid bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden group h-fit ${isArchived ? "opacity-75 grayscale" : ""}`}>
        
        {/* --- IMAGE AREA --- */}
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-800 group-hover:opacity-95 transition-opacity cursor-pointer">
          {meta?.image ? (
            <Image 
              src={meta.image} 
              alt={link.title || "Link thumbnail"} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900">
               <ExternalLink className="h-8 w-8 text-gray-300 dark:text-slate-600" />
            </div>
          )}

          {/* Type Icon */}
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 p-1.5 rounded-full backdrop-blur-sm z-10 shadow-sm pointer-events-none">
            {link.type === 'YOUTUBE' ? <Youtube className="h-4 w-4 text-red-600" /> : 
             link.type === 'TWITTER' ? <Twitter className="h-4 w-4 text-blue-400" /> : 
             <ExternalLink className="h-4 w-4 text-gray-600 dark:text-slate-400" />}
          </div>

          {isCopied && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-in fade-in duration-200 z-20">
              <div className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                <Check className="h-3 w-3 text-green-600" /> Copied!
              </div>
            </div>
          )}
        </a>

        {/* --- CONTENT AREA --- */}
        <div className="p-4">
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="block font-semibold text-slate-900 dark:text-slate-100 leading-snug mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title={link.title || ""}>
            {link.title || link.url}
          </a>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {new Date(link.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            
            {/* ACTION BUTTONS (Restored original hover behavior) */}
            <div className="flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              {isArchived ? (
                <>
                  <button onClick={handleRestore} className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 rounded-md text-slate-500 dark:text-slate-400 transition-colors" title="Restore">
                    <RefreshCcw className="h-4 w-4" />
                  </button>
                  <button onClick={() => setShowDeleteDialog(true)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete Forever">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditOpen(true)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-slate-500 dark:text-slate-400 transition-colors" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={handleCopy} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md text-slate-500 dark:text-slate-400 transition-colors" title="Copy">
                    {isCopied ? <Check className="h-4 w-4 text-green-600"/> : <Copy className="h-4 w-4" />}
                  </button>
                  <button onClick={toggleFavorite} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Favorite">
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-500 dark:text-slate-400"}`} />
                  </button>
                  <button onClick={handleSoftDelete} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" title="Move to Trash">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-[95vw] max-w-md rounded-xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <DialogHeader><DialogTitle className="text-slate-900 dark:text-white">Edit Link</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setIsEditOpen(false)} className="text-sm text-gray-500 dark:text-slate-400 font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">Cancel</button>
            <button onClick={saveEdit} disabled={isSaving} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">
               {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="w-[95vw] max-w-sm rounded-xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">{isArchived ? "Delete Forever?" : "Move to Trash?"}</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              {isArchived 
                ? "This action cannot be undone. This link will be permanently removed." 
                : "You can restore this link later from the Trash tab."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <button 
              onClick={() => setShowDeleteDialog(false)} 
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete} 
              disabled={isDeleting} 
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : isArchived ? "Delete Forever" : "Move to Trash"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}