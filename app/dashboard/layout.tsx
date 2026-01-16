import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardSidebar } from "@/components/dashboard-sidebar"; 
import { AddLinkModal } from "@/components/add-link-modal";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  const folders = await prisma.folder.findMany({
    where: { userId: session?.user?.id },
    orderBy: { name: "asc" }
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      
      <DashboardSidebar 
        user={{ name: session?.user?.name, email: session?.user?.email }} 
        folders={folders} 
      />

      <main className="flex-1 md:ml-64 pt-20 pb-8 px-4 md:py-8 md:px-8 w-full transition-all duration-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6">
            <AddLinkModal />
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}