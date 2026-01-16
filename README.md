# 🧠 Stash - Your Digital Brain for the Web

**Stash** is a modern, full-stack link management platform designed to replace messy browser bookmarks. It turns raw URLs from YouTube, X (Twitter), and LinkedIn into rich, visual cards with automatic metadata previews.

🔗 **Live Demo:** [https://stash-lovat.vercel.app/](https://stash-lovat.vercel.app/)

![Stash Dashboard Screenshot](public/dashboard-preview.png)

## 🚀 Features

- **Visual Link Previews:** Automatically scrapes Open Graph metadata (images, titles, descriptions) to turn links into visual cards.
- **Smart Collections:** Organize content into custom folders/collections.
- **Public Sharing:** Toggle folders to "Public" and share curated lists with a single link.
- **Robust Metadata Scraping:** Custom server-side scraping logic (using `cheerio`) that handles bot protection on sites like YouTube and Twitter.
- **Soft Delete & Archive:** "Trash" functionality to safely archive links before permanent deletion.
- **Responsive UI:** Fully responsive design built with Tailwind CSS and Shadcn UI.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Styling:** Tailwind CSS
- **Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** Lucide React
- **Deployment:** Vercel

## ⚙️ Getting Started

Follow these steps to run Stash locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/stash.git](https://github.com/yourusername/stash.git)
cd stash
```

2. Install dependencies
```
npm install
# or
yarn install
```

3. Configure Environment Variables
Create a .env file in the root directory and add the following keys. You will need a PostgreSQL database URL (you can use Supabase or a local Postgres instance).
```
DATABASE_URL="postgresql://user:password@localhost:5432/stash?schema=public"
NEXTAUTH_SECRET="your-super-secret-key-change-this"
NEXTAUTH_URL="http://localhost:3000"
```

4. Setup Database
Push the Prisma schema to your database to create the tables
```
npx prisma db push
```

5. Run the development server
```
npm run dev
```

🧩Key Code Highlights

Metadata Scraper (app/api/metadata/route.ts)

Stash uses a custom server-side scraper that mimics a real browser User-Agent. This allows it to bypass bot protection on major platforms like YouTube and X, ensuring high-quality link previews where standard scrapers fail.

Optimistic UI Updates
The application leverages React state for immediate feedback on actions like "Favorite," "Archive," or "Delete." This creates a snappy, app-like feel while the server processes the request in the background.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
