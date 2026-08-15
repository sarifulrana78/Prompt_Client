import Link from 'next/link';
import { Facebook, Instagram, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
              Prompt<span className="text-primary">Base</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              The premier marketplace for AI prompts. Discover, share, and monetize high-quality prompts for ChatGPT, Midjourney, and more.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/prompts" className="hover:text-primary transition-colors">Browse Prompts</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Premium</Link></li>
              <li><Link href="/demo" className="hover:text-primary transition-colors flex items-center gap-2">Demo Accounts <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary">NEW</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Questions? Support at:<br/>
              <a href="mailto:support@promptbase.com" className="hover:text-primary">support@promptbase.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PromptBase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
