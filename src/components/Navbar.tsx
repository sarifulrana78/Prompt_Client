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
          <Sparkles className="w-6 h-6 text-purple-500" />
          <span>Prompt<span className="text-purple-500">Base</span></span>
        </Link>
        
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/prompts" className="text-sm text-gray-300 hover:text-white transition-colors">All Prompts</Link>
          
          {session ? (
            <>
              <Link href={(session?.user as any)?.role === 'Creator' ? '/dashboard/creator' : (session?.user as any)?.role === 'Admin' ? '/dashboard/admin' : '/dashboard'} className="text-sm text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-2 text-sm border border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="flex items-center gap-2 text-sm text-gray-300 border border-white/20 px-4 py-2 rounded-xl hover:bg-white/5 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                Login
              </Link>
              <Link href="/register" className="flex items-center gap-2 text-sm bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-xl transition-colors font-medium shadow-lg shadow-purple-500/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Register
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
              <Link href={(session?.user as any)?.role === 'Creator' ? '/dashboard/creator' : (session?.user as any)?.role === 'Admin' ? '/dashboard/admin' : '/dashboard'} onClick={() => setMobileOpen(false)} className="block text-sm text-gray-300 hover:text-white py-2">Dashboard</Link>
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
