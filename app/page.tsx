import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LayoutGrid, Share2, FolderHeart, Star } from "lucide-react";
import { Logo } from "@/components/logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 dark:bg-slate-950 dark:text-white dark:selection:bg-blue-900 transition-colors">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Logo className="h-8 w-8" />
            Stash.
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="text-sm font-medium bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-white px-5 py-2.5 rounded-full transition-all hover:shadow-lg active:scale-95"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-100 dark:border-blue-800">
            <Star className="h-3 w-3 fill-blue-700 dark:fill-blue-300" /> New: Share your collections
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Stop losing your <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              favorite links.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stash is the visual bookmark manager for the modern web. 
            Save YouTube videos, Twitter threads, and articles in one beautiful, organized space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link 
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl flex items-center justify-center transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* --- DASHBOARD PREVIEW IMAGE --- */}
        <div className="max-w-6xl mx-auto relative group">
            {/* 1. Glow Effect Behind */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            {/* 2. Browser Window Container */}
            <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                
                {/* Browser Header Bar */}
                <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center gap-4">
                    {/* Traffic Lights */}
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>
                    {/* Fake Address Bar */}
                    <div className="flex-1 max-w-2xl mx-auto h-8 bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-700 flex items-center px-3 text-xs text-slate-400 font-mono">
                        stash.com/dashboard
                    </div>
                </div>

                {/* 3. OPTIMIZED IMAGE COMPONENT */}
                <Image 
                   src="/dashboard-preview.png" 
                   alt="Stash Dashboard Preview" 
                   width={1200}
                   height={675}
                   priority
                   className="w-full h-auto block"
                />
            </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to stay organized</h2>
            <p className="text-slate-500 dark:text-slate-400">We keep it simple. No cluttered toolbars, just the features you actually use.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Visual Cards</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Forget boring lists. We automatically scrape metadata to display rich previews for your links.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <FolderHeart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Smart Collections</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Organize your resources into folders. Keep your `Design Inspo` separate from your `React Tutorials`.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Public Pages</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Turn any folder into a public webpage with one click. Perfect for sharing resources with your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-blue-900/20 rounded-3xl p-12 text-center relative overflow-hidden border border-slate-800 dark:border-blue-800/50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-800/20 via-transparent to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to organize your digital life?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of developers and creators who use Stash to keep track of their best finds.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
             <Logo className="h-6 w-6" /> Stash.
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Stash. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400 items-center">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <a 
              href="https://www.linkedin.com/in/satish-choudhary-236944219/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}