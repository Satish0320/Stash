import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LinkCard } from "@/components/link-card";
import { Star } from "lucide-react";

export default async function FavoritesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const links = await prisma.link.findMany({
    where: { 
      userId: session.user?.id,
      isFavorite: true, // Only favorites
      isArchived: false // Don't show if it's in trash
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
           <Star className="h-6 w-6 fill-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Favorites</h1>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
        {links.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
            No favorites yet. Click the heart icon on any link to add it here.
          </div>
        )}
      </div>
    </div>
  );
}