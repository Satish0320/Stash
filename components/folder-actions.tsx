"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Folder } from "@prisma/client";

interface FolderActionsProps {
  folder: Folder;
}

export function FolderActions({ folder }: FolderActionsProps) {
  const router = useRouter();
  
  // Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRename = async () => {
    if (!newName.trim()) return;
    setIsSaving(true);
    try {
      await fetch(`/api/folders/${folder.id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
      });
      setIsEditOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`/api/folders/${folder.id}`, {
        method: "DELETE",
      });
      setIsDeleteOpen(false);
      router.push("/dashboard"); // Redirect to home after delete
      router.refresh();
    } catch (e) {
      console.error(e);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Action Buttons */}
      <button 
        onClick={() => setIsEditOpen(true)}
        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        title="Rename Folder"
      >
        <Pencil className="h-4 w-4" />
      </button>
      
      <button 
        onClick={() => setIsDeleteOpen(true)}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        title="Delete Folder"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* RENAME MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-[95vw] max-w-md rounded-xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <DialogHeader><DialogTitle className="text-slate-900 dark:text-white">Rename Collection</DialogTitle></DialogHeader>
          <div className="py-4">
             <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <DialogFooter>
            <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Cancel</button>
            <button onClick={handleRename} disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
               {isSaving && <Loader2 className="h-3 w-3 animate-spin" />} Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="w-[95vw] max-w-sm rounded-xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">Delete Collection?</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
               `{folder.name}` will be deleted. Links inside will move to `All Items`.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
             <button onClick={() => setIsDeleteOpen(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700">Cancel</button>
             <button onClick={handleDelete} disabled={isDeleting} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50">
               {isDeleting ? "Deleting..." : "Delete"}
             </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}