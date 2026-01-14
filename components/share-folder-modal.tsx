"use client";

import { useState, useEffect } from "react"; // <--- Add useEffect
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share2, Copy, Check, Globe, Lock } from "lucide-react";
import { Folder } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ShareModalProps {
  folder: Folder;
}

export function ShareFolderModal({ folder }: ShareModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(folder.isPublic);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Add state for the origin
  const [origin, setOrigin] = useState("");

  // 2. Use useEffect to set it ONLY on the client
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // 3. Construct URL safely
  const shareUrl = `${origin}/share/${folder.slug}`;

  const toggleShare = async () => {
    setIsLoading(true);
    const newState = !isPublic;
    
    try {
      await fetch(`/api/folders/${folder.id}/share`, {
        method: "PATCH",
        body: JSON.stringify({ isPublic: newState }),
      });
      setIsPublic(newState);
      router.refresh();
    } catch {
      console.error("Failed to update share settings");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-lg font-medium">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Collection</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isPublic ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                {isPublic ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              </div>
              <div>
                <div className="font-medium text-slate-900">
                  {isPublic ? "Publicly Accessible" : "Private Collection"}
                </div>
                <div className="text-xs text-slate-500">
                  {isPublic ? "Anyone with the link can view this." : "Only you can see this collection."}
                </div>
              </div>
            </div>
            
            <button 
              onClick={toggleShare}
              disabled={isLoading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isPublic ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Link Copy Section */}
          {isPublic && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Public Link</label>
              <div className="flex gap-2">
                <input 
                  readOnly 
                  value={shareUrl} 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center min-w-11"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}