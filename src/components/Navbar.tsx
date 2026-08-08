'use client';

import Link from 'next/link';
import { Search, LogOut, Sparkles, Moon, Sun } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/theme';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span>Prompt<span className="text-primary">Base</span></span>
        </Link>
        
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search for prompts..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-gray-200 hover:text-white transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link href="/prompts" className="text-sm text-gray-300 hover:text-white transition-colors">
            All Prompts
          </Link>
          
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
              <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-colors font-medium">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
