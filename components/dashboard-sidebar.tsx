"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Star, Trash2, LogOut, Folder, Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { CreateFolderModal } from "@/components/create-folder-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo"; // <--- Import the new Logo

interface UserProps {
  name?: string | null;
  email?: string | null;
}

interface SidebarProps {
  user: UserProps;
  folders: { id: string; name: string }[];
}

function SidebarContent({ 
  user, 
  folders, 
  pathname, 
  onLinkClick 
}: SidebarProps & { pathname: string; onLinkClick?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-colors">
      
      <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between h-16 shrink-0">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white tracking-tight">
          <Logo className="h-6 w-6" />
          Stash.
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {onLinkClick && (
            <button 
              onClick={onLinkClick} 
              className="md:hidden text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 p-2 rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* --- NAV LINKS --- */}
      <div className="p-4 space-y-1 overflow-y-auto flex-1">
        <Link 
          href="/dashboard" 
          onClick={onLinkClick}
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname === "/dashboard" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <LayoutGrid className="h-4 w-4" /> All Items
        </Link>
        <Link 
          href="/dashboard/favorites" 
          onClick={onLinkClick}
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname === "/dashboard/favorites" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <Star className="h-4 w-4" /> Favorites
        </Link>
        <Link 
          href="/dashboard/trash" 
          onClick={onLinkClick}
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname === "/dashboard/trash" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <Trash2 className="h-4 w-4" /> Trash
        </Link>

        <div className="pt-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Collections</h3>
            <CreateFolderModal />
          </div>
          
          <div className="space-y-1">
            {folders.length === 0 ? (
              <p className="text-xs text-slate-400 px-3 italic">No collections yet</p>
            ) : (
              folders.map((folder) => (
                <Link 
                  key={folder.id} 
                  href={`/dashboard/folder/${folder.id}`}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group ${
                     pathname === `/dashboard/folder/${folder.id}` 
                     ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" 
                     : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Folder className={`h-4 w-4 ${pathname === `/dashboard/folder/${folder.id}` ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-blue-500 dark:text-slate-500"}`} /> 
                  <span className="truncate">{folder.name}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-800 mt-auto bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 mb-4">
           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold shrink-0">
             {user.name?.[0] || "U"}
           </div>
           <div className="text-sm overflow-hidden">
             <p className="font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
             <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
           </div>
        </div>
        <button 
          onClick={() => signOut()} 
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 font-medium px-1 w-full transition-colors"
        >
          <LogOut className="h-3 w-3" /> Sign Out
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar({ user, folders }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-30 flex items-center px-4 justify-between transition-colors">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <Logo className="h-6 w-6" />
          Stash.
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          
          {/* Sidebar Panel */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-xl animate-in slide-in-from-left duration-200">
            <SidebarContent 
              user={user} 
              folders={folders} 
              pathname={pathname} 
              onLinkClick={() => setIsOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden md:flex flex-col w-64 fixed inset-y-0 z-20 h-screen">
        <SidebarContent 
          user={user} 
          folders={folders} 
          pathname={pathname} 
        />
      </div>
    </>
  );
}