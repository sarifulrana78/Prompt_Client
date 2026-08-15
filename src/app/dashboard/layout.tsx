'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { 
  PlusSquare, 
  List, 
  Bookmark, 
  MessageSquare, 
  User, 
  BarChart, 
  Users, 
  CreditCard, 
  Flag,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  LogOut
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Show loading spinner while checking auth status
  if (isPending) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isPending && !session) {
    router.push('/login');
    return null; // Return nothing while redirecting
  }

  const userRole: string = (session?.user as { role?: string } | undefined)?.role || 'User';
  const userName: string = session?.user?.name || 'User';
  const userInitial: string = userName.charAt(0).toUpperCase();  const userLinks = [
    { name: 'Profile', href: '/dashboard', icon: User },
    { name: 'Add Prompt', href: '/dashboard/add', icon: PlusSquare },
    { name: 'My Prompts', href: '/dashboard/prompts', icon: List },
    { name: 'Saved Prompts', href: '/dashboard/saved', icon: Bookmark },
    { name: 'My Reviews', href: '/dashboard/reviews', icon: MessageSquare },
  ];

  const creatorLinks = [
    { name: 'My Profile', href: '/dashboard', icon: User },
    { name: 'Creator Home', href: '/dashboard/creator', icon: LayoutDashboard },
    { name: 'Add Prompt', href: '/dashboard/add', icon: PlusCircle },
    { name: 'My Prompts', href: '/dashboard/prompts', icon: BookOpen },
  ];

  const adminLinks = [
    { name: 'My Profile', href: '/dashboard', icon: User },
    { name: 'Analytics', href: '/dashboard/admin', icon: BarChart },
    { name: 'All Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'All Prompts', href: '/dashboard/admin/prompts', icon: List },
    { name: 'All Payments', href: '/dashboard/admin/payments', icon: CreditCard },
    { name: 'Reported Prompts', href: '/dashboard/admin/reports', icon: Flag },
  ];

  let links = userLinks;
  if (userRole === 'Creator') links = creatorLinks;
  if (userRole === 'Admin') links = adminLinks;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 border-b border-border bg-card flex justify-between items-center">
        <h2 className="font-semibold">Dashboard</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-md">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 bg-card border-r border-border shrink-0 z-40
      `}>
        <div className="p-6 sticky top-16">
          <div className="flex items-center gap-4 mb-8 bg-[#1a1b2e] p-3 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-primary font-bold text-sm bg-[#11131e]">
                {userInitial}
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-sm">{userName}</div>
              <div className="text-xs text-gray-400 mt-0.5 uppercase">{userRole}</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-8 border-t border-white/5 pt-6">
            <button
              onClick={async () => {
                await signOut();
                router.push('/');
              }}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-colors text-gray-400 hover:text-white hover:bg-white/5 text-left"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
