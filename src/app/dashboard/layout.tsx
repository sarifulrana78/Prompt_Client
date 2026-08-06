'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
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
  X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mock role for now - can be 'User', 'Creator', or 'Admin'
  const userRole: string = 'Creator';

  const userLinks = [
    { name: 'Profile', href: '/dashboard', icon: User },
    { name: 'Add Prompt', href: '/dashboard/add', icon: PlusSquare },
    { name: 'My Prompts', href: '/dashboard/prompts', icon: List },
    { name: 'Saved Prompts', href: '/dashboard/saved', icon: Bookmark },
    { name: 'My Reviews', href: '/dashboard/reviews', icon: MessageSquare },
  ];

  const creatorLinks = [
    { name: 'Analytics', href: '/dashboard/creator', icon: BarChart },
    { name: 'Add Prompt', href: '/dashboard/add', icon: PlusSquare },
    { name: 'My Prompts', href: '/dashboard/prompts', icon: List },
  ];

  const adminLinks = [
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
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
              U
            </div>
            <div>
              <div className="font-bold">John Doe</div>
              <div className="text-xs text-primary">{userRole}</div>
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-background">
        {children}
      </main>
    </div>
  );
}
