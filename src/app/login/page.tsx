'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, signUp } from '@/lib/auth-client';
import DemoLogins from '@/components/DemoLogins';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn.email({
        email,
        password,
      });
      if (res.error) {
        toast.error(res.error.message || 'Login failed');
      } else {
        toast.success('Logged in successfully!');
        const role = (res.data?.user as any)?.role;
        if (role === 'Creator') {
          router.push('/dashboard/creator');
        } else if (role === 'Admin') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string, role: string) => {
    setLoading(true);
    try {
      // Attempt login first
      const { error } = await signIn.email({ email: demoEmail, password: demoPass });
      if (error) {
        // If login fails, assume demo user doesn't exist yet and create them
        toast.info(`Setting up ${role} demo account...`);
        const { error: signUpErr } = await signUp.email({
          email: demoEmail,
          password: demoPass,
          name: `${role} User`,
          ...({ role } as any),
        });
        
        if (signUpErr) {
          toast.error(`Failed to create demo account: ${signUpErr.message || JSON.stringify(signUpErr)}`);
          setLoading(false);
          return;
        }
        
        // Login after successful creation
        await signIn.email({ email: demoEmail, password: demoPass });
      }
      
      toast.success(`Logged in as ${role}!`);
      if (role === 'Creator') {
        router.push('/dashboard/creator');
      } else if (role === 'Admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      toast.error('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const res = await signIn.social({
        provider: 'google',
        callbackURL: `${origin}/dashboard`
      });
      if (res?.error) {
        toast.error(res.error.message || 'Google login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Google login failed. Please verify server is running on port 5000.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-24">
      <div className="max-w-md w-full bg-[#11131a] border border-white/5 rounded-2xl p-8 shadow-2xl shrink-0">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-white">Welcome Back</h1>
          <p className="text-sm text-gray-400">Login to search, copy, and manage premium prompts</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#151923] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#151923] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm font-mono tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Log In
              </>
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-white/5 flex-1"></div>
          <span className="text-xs text-gray-500">or continue with</span>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-[#151923] border border-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/5 transition-colors text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign In with Google
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don&apos;t have an account? <Link href="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">Register here</Link>
        </p>
      </div>
      <DemoLogins onLogin={handleDemoLogin} />
    </div>
  );
}
