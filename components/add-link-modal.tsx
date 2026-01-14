"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Plus, Loader2, Folder } from "lucide-react";
import { useRouter } from "next/navigation";

interface Folder {
  id: string;
  name: string;
}

interface PreviewData {
  title: string;
  type: string;
  metadata?: {
    image?: string;
    description?: string;
  }
}

export function AddLinkModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // State
  const [url, setUrl] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(""); // <--- New State
  const [folders, setFolders] = useState<Folder[]>([]);     // <--- New State
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);

  // 1. Fetch Folders when modal opens
  useEffect(() => {
    if (open) {
      fetch("/api/folders")
        .then((res) => res.json())
        .then((data) => setFolders(data))
        .catch((err) => console.error("Failed to load folders", err));
    }
  }, [open]);

  const handleScrape = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch("/api/metadata", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setPreview(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preview) return;
    setLoading(true);

    await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({
        url,
        title: preview.title,
        type: preview.type,
        metadata: preview.metadata,
        folderId: selectedFolder // <--- Send the folder ID
      }),
    });

    setLoading(false);
    setUrl("");
    setPreview(null);
    setSelectedFolder("");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-medium mb-6 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add New Link
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Stash</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">

          {/* URL Input */}
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube or Twitter URL..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button
              onClick={handleScrape}
              disabled={loading || !url}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Preview"}
            </button>
          </div>

          {/* Folder Selection (Only shows if you have folders) */}
          {folders.length > 0 && (
            <div className="relative">
              <Folder className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-700"
              >
                <option value="">No Collection (All Items)</option>
                {folders.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Preview Card */}
          {preview && (
            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex gap-3 items-start animate-in slide-in-from-top-2">
              {preview.metadata?.image ? (
                <img src={preview.metadata.image} className="w-16 h-16 object-cover rounded-md" />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">No Img</div>
              )}
              <div className="flex-1 overflow-hidden">
                <div className="text-xs font-bold text-blue-600 mb-1">{preview.type}</div>
                <div className="text-sm font-medium line-clamp-2 leading-tight">{preview.title}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 font-medium px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!preview || loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Link
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}