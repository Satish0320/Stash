import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LinkCard } from "@/components/link-card";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const links = await prisma.link.findMany({
    where: { 
      userId: session.user?.id,
      isArchived: false
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">All Items</h1>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}

        {links.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center break-inside-avoid">
             <div className="h-20 w-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-4xl">🤔</div>
             <h3 className="text-lg font-medium text-slate-900 dark:text-white">Your stash is empty</h3>
             <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
               Click the `Add New Link` button to save your first YouTube video or Tweet.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}