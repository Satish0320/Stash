import Link from "next/link";
import { ArrowRight, LayoutGrid, Share2, FolderHeart, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">S</span>
            Stash.
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full transition-all hover:shadow-lg active:scale-95"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Star className="h-3 w-3 fill-blue-700" /> New: Share your collections
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Stop losing your <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">
              favorite links.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stash is the visual bookmark manager for the modern web. 
            Save YouTube videos, Twitter threads, and articles in one beautiful, organized space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-200"
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link 
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Hero Image / Mockup Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl">
           <div className="rounded-xl overflow-hidden bg-white border border-slate-100 aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-blue-50/50 flex flex-col items-center justify-center text-slate-300">
                <LayoutGrid className="h-16 w-16 mb-4 opacity-50" />
                <span className="text-sm font-medium uppercase tracking-widest">Dashboard Preview</span>
              </div>
           </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to stay organized</h2>
            <p className="text-slate-500">We keep it simple. No cluttered toolbars, just the features you actually use.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Visual Cards</h3>
              <p className="text-slate-500 leading-relaxed">
                Forget boring lists. We automatically scrape metadata to display rich previews for your links.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <FolderHeart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Collections</h3>
              <p className="text-slate-500 leading-relaxed">
                Organize your resources into folders. Keep your `Design Inspo` separate from your `React Tutorials``.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Public Pages</h3>
              <p className="text-slate-500 leading-relaxed">
                Turn any folder into a public webpage with one click. Perfect for sharing resources with your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
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
      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
             <div className="w-6 h-6 bg-slate-900 rounded-md"></div> Stash.
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Stash Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-slate-900">Privacy</Link>
            <Link href="#" className="hover:text-slate-900">Terms</Link>
            <Link href="#" className="hover:text-slate-900">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}