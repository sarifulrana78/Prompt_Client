import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
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
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PromptBase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
