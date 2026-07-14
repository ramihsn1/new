'use client';

import { useState, useEffect } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('auth_token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const res = await fetch(`${API_URL}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setUsers(data.data);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white">User Management</h2>
          <p className="text-sm text-text-secondary dark:text-white/85">{users.length} users</p>
        </div>
      </div>

      {loading ? (
        <div className="card p-12 text-center text-sm text-primary">Loading...</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/5 dark:border-white/5">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5 dark:divide-white/5">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-primary/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold text-primary">{user.name[0]}</div>
                        <span className="text-sm font-medium text-primary dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                        user.role === 'super_admin' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                        user.role === 'admin' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                        'bg-gray-50 dark:bg-gray-900/20 text-gray-500'
                      }`}>{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    </td>
                    <td className="px-6 py-4 text-sm text-primary">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
