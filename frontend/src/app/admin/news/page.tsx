'use client';

import { useState, useEffect } from 'react';
import AdminListPage from '@/components/admin/AdminListPage';

export default function AdminNewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setEditingItem((e as CustomEvent).detail);
      setShowForm(true);
    };
    window.addEventListener('edit-item', handler);
    return () => window.removeEventListener('edit-item', handler);
  }, []);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category.en', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'publishedAt', label: 'Published' },
  ];

  return (
    <div>
      {showForm ? (
        <NewsForm
          item={editingItem}
          onClose={() => { setShowForm(false); setEditingItem(null); }}
          onSaved={() => { setShowForm(false); setEditingItem(null); window.location.reload(); }}
        />
      ) : (
        <AdminListPage
          entityName="News"
          columns={columns}
          apiEndpoint="/news"
          onCreateNew={() => { setEditingItem(null); setShowForm(true); }}
        />
      )}
    </div>
  );
}

function NewsForm({ item, onClose, onSaved }: { item: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: { en: item?.title?.en || '', ar: item?.title?.ar || '', tr: item?.title?.tr || '' },
    slug: { en: item?.slug?.en || '', ar: item?.slug?.ar || '', tr: item?.slug?.tr || '' },
    content: { en: item?.content?.en || '', ar: item?.content?.ar || '', tr: item?.content?.tr || '' },
    excerpt: { en: item?.excerpt?.en || '', ar: item?.excerpt?.ar || '', tr: item?.excerpt?.tr || '' },
    category: { en: item?.category?.en || '', ar: item?.category?.ar || '', tr: item?.category?.tr || '' },
    status: item?.status || 'draft',
    tags: item?.tags?.join(', ') || '',
    isBreaking: item?.isBreaking || false,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const token = localStorage.getItem('auth_token');
    const url = item ? `${API_URL}/news/${item._id}` : `${API_URL}/news`;
    const method = item ? 'PUT' : 'POST';

    const data = {
      ...form,
      tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
    };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    setSaving(false);
    onSaved();
  };

  const langs = ['en', 'ar', 'tr'];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary dark:text-white">{item ? 'Edit News' : 'Create News'}</h3>
        <button onClick={onClose} className="text-sm text-text-secondary hover:text-primary transition-colors">Cancel</button>
      </div>

      <div className="space-y-5">
        {langs.map(lang => (
          <div key={lang}>
            <label className="block text-sm font-medium text-primary dark:text-white mb-1">Title ({lang.toUpperCase()})</label>
            <input type="text" value={(form.title as any)[lang]} onChange={e => setForm({ ...form, title: { ...form.title, [lang]: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" />
          </div>
        ))}

        <div className="grid sm:grid-cols-2 gap-4">
          {langs.map(lang => (
            <div key={lang}>
              <label className="block text-sm font-medium text-primary dark:text-white mb-1">Slug ({lang.toUpperCase()})</label>
              <input type="text" value={(form.slug as any)[lang]} onChange={e => setForm({ ...form, slug: { ...form.slug, [lang]: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-1">Category (EN)</label>
            <input type="text" value={form.category.en} onChange={e => setForm({ ...form, category: { ...form.category, en: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-1">Tags</label>
            <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="policy, research, international"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary dark:text-white mb-1">Excerpt (EN)</label>
          <textarea value={form.excerpt.en} onChange={e => setForm({ ...form, excerpt: { ...form.excerpt, en: e.target.value } })} rows={2}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary dark:text-white mb-1">Content (EN)</label>
          <textarea value={form.content.en} onChange={e => setForm({ ...form, content: { ...form.content, en: e.target.value } })} rows={6}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none" />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-primary dark:text-white mb-1">Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-primary dark:text-white">
            <input type="checkbox" checked={form.isBreaking} onChange={e => setForm({ ...form, isBreaking: e.target.checked })}
              className="rounded" />
            Breaking News
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
            {saving ? 'Saving...' : item ? 'Update' : 'Create'}
          </button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-medium text-primary hover:bg-primary/5 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}
