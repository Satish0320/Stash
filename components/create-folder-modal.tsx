"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2, FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateFolderModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/folders", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setOpen(false);
        setName("");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          suppressHydrationWarning
          className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <Plus className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-md rounded-xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <FolderPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Create Collection
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Design Inspiration..."
            className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </div>
        <DialogFooter>
          <button onClick={() => setOpen(false)} className="text-sm text-gray-500 dark:text-slate-400 font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading || !name.trim()}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            Create
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}