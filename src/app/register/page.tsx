'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, UserPlus, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        image: photoURL || undefined
      });
      if (error) {
        toast.error(error.message || 'Registration failed');
      } else {
        toast.success('Account created successfully!');
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 my-8">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 glass shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-400">Join the largest AI prompt marketplace</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-border rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-border rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Photo URL (Optional)</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="url" 
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full bg-black/30 border border-border rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-border rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium transition-colors mt-6 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
