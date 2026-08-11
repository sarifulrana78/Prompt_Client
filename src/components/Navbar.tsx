'use client';

import Link from 'next/link';
import { Search, LogOut, Sparkles, Moon, Sun, Menu, X } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/theme';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      router.push(`/prompts?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setMobileOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 shrink-0">
          <Sparkles className="w-6 h-6 text-primary" />
          <span>Prompt<span className="text-primary">Base</span></span>
        </Link>
        
        <form onSubmit={handleNavSearch} className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search for prompts..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </form>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="text-gray-200 hover:text-white transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/prompts" className="text-sm text-gray-300 hover:text-white transition-colors">All Prompts</Link>
          
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-colors font-medium">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-300" aria-label="Toggle menu">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-3">
          <form onSubmit={handleNavSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search prompts..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary"
            />
          </form>
          <Link href="/" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-300 hover:text-white py-2">Home</Link>
          <Link href="/prompts" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-300 hover:text-white py-2">All Prompts</Link>
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-300 hover:text-white py-2">Dashboard</Link>
              <button onClick={handleSignOut} className="w-full text-left text-sm text-red-400 hover:text-red-300 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-300 hover:text-white py-2">Login</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="block text-sm bg-primary text-white px-4 py-2 rounded-lg text-center font-medium">Sign Up</Link>
            </>
          )}
          <button onClick={toggleTheme} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white py-2">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
