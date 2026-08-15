import Link from 'next/link';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

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
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
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
