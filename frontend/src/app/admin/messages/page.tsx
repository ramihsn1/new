'use client';

import { useState, useEffect } from 'react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchMessages = async () => {
    const token = localStorage.getItem('auth_token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const res = await fetch(`${API_URL}/public/contacts`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.success) setMessages(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem('auth_token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    await fetch(`${API_URL}/public/contacts/${id}/read`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
    fetchMessages();
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-1">
            {messages.map((msg) => (
              <button key={msg._id} onClick={() => { setSelected(msg); if (!msg.isRead) markAsRead(msg._id); }}
                className={`w-full text-left p-4 border transition-colors ${
                  selected?._id === msg._id ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-900' : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                }`}>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{msg.name}</p>
                <p className="text-xs text-gray-700 mt-0.5 truncate">{msg.subject}</p>
                <p className="text-[10px] text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2">
            {selected ? (
              <div className="border border-gray-200 dark:border-gray-800 p-8">
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{selected.subject}</p>
                  <p className="text-sm text-gray-600">{selected.name} — {selected.email}</p>
                  {selected.phone && <p className="text-sm text-gray-600">{selected.phone}</p>}
                  <p className="text-[10px] text-gray-500 mt-2">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-gray-800 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-800 p-8 text-center text-sm text-gray-500">Select a message</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
