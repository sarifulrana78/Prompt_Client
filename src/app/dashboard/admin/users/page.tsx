'use client';

import { useState, useEffect } from 'react';
import { Users, Loader2, Trash2, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE = '/api';

type AdminUser = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  photoURL?: string;
  image?: string;
  subscription?: string;
  createdAt?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/admin/all`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setUsers(data.users || []);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`${API_BASE}/users/admin/role/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Role updated to ${newRole}`);
        setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
      } else {
        toast.error(data.message || 'Failed to update role');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${API_BASE}/users/admin/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('User deleted successfully');
        setUsers(users.filter((u) => u._id !== userId));
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white">
        <Users className="w-8 h-8 text-[#8b5cf6]" />
        User Role & Accounts Management
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#8b5cf6] mr-2" /> Loading users...
        </div>
      ) : (
        <div className="bg-[#11131e] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#1a1b2e] border-b border-white/5 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <th className="px-6 py-5">Profile Details</th>
                  <th className="px-6 py-5">Email Address</th>
                  <th className="px-6 py-5">Subscription</th>
                  <th className="px-6 py-5">Role Level</th>
                  <th className="px-6 py-5">Registered Date</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#0ea5e9] p-[1.5px] shrink-0">
                           <div className="w-full h-full rounded-full bg-[#11131e] flex items-center justify-center overflow-hidden">
                             {u.photoURL || u.image ? (
                               <img src={u.photoURL || u.image} alt={u.name || 'User'} className="w-full h-full object-cover" />
                             ) : (
                               <span className="text-xs font-bold text-white">{u.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                             )}
                           </div>
                        </div>
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                        u.subscription === 'Premium' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {u.subscription || 'Free'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="bg-black/20 border border-white/5 hover:border-white/20 rounded-lg py-2 pl-3 pr-8 text-xs text-white focus:outline-none focus:border-[#8b5cf6] w-28 appearance-none cursor-pointer transition-colors"
                        >
                          <option value="User">User</option>
                          <option value="Creator">Creator</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 opacity-50" />
                        {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
