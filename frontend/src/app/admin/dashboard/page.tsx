'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch {}
    })();
  }, []);

  const cards = [
    { label: 'News Articles', value: stats?.news?.total || 0, pub: stats?.news?.published || 0, href: '/admin/news' },
    { label: 'Events', value: stats?.event?.total || 0, pub: stats?.event?.published || 0, href: '/admin/events' },
    { label: 'Services', value: stats?.service?.total || 0, pub: stats?.service?.published || 0, href: '/admin/services' },
    { label: 'Publications', value: stats?.publication?.total || 0, pub: stats?.publication?.published || 0, href: '/admin/publications' },
    { label: 'Projects', value: stats?.project?.total || 0, pub: stats?.project?.published || 0, href: '/admin/projects' },
    { label: 'Team', value: stats?.team?.total || 0, pub: stats?.team?.published || 0, href: '/admin/team' },
    { label: 'Partners', value: stats?.partner?.total || 0, pub: stats?.partner?.published || 0, href: '/admin/partners' },
    { label: 'Messages', value: stats?.unreadMessages || 0, pub: 0, href: '/admin/messages', highlight: true },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Overview of all content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <Link key={c.label} href={c.href}
            className={`block bg-white dark:bg-black border p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-colors ${
              c.highlight ? 'border-[#a89060]/30 dark:border-[#a89060]/20' : 'border-gray-200 dark:border-gray-800'
            }`}>
            <div className={`text-3xl font-bold mb-1 ${c.highlight ? 'text-[#a89060]' : 'text-gray-900 dark:text-white'}`}>
              {c.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">{c.label}</div>
            {c.pub > 0 && <div className="text-[10px] text-gray-400 mt-1.5">{c.pub} published</div>}
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Quick actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: 'New Article', href: '/admin/news', active: true },
            { label: 'Create Event', href: '/admin/events' },
            { label: 'Add Publication', href: '/admin/publications' },
            { label: 'Add Service', href: '/admin/services' },
            { label: 'Add Project', href: '/admin/projects' },
            { label: 'Upload Media', href: '/admin/media' },
            { label: 'View Messages', href: '/admin/messages' },
            { label: 'Manage Team', href: '/admin/team' },
            { label: 'Settings', href: '/admin/settings' },
          ].map(a => (
            <Link key={a.label} href={a.href}
              className="px-4 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors text-center uppercase tracking-wide">
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
