'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_URL}/settings`);
    const data = await res.json();
    if (data.success) setSettings(data.data);
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('auth_token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (data.success) setMessage('Settings saved!');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const settingFields = [
    { key: 'contact_email', label: 'Contact Email', type: 'email' },
    { key: 'contact_phone', label: 'Contact Phone', type: 'text' },
    { key: 'contact_address_en', label: 'Address (EN)', type: 'text' },
    { key: 'contact_address_ar', label: 'Address (AR)', type: 'text' },
    { key: 'contact_address_tr', label: 'Address (TR)', type: 'text' },
    { key: 'social_facebook', label: 'Facebook URL', type: 'url' },
    { key: 'social_twitter', label: 'Twitter URL', type: 'url' },
    { key: 'social_linkedin', label: 'LinkedIn URL', type: 'url' },
    { key: 'social_youtube', label: 'YouTube URL', type: 'url' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white">Website Settings</h2>
          <p className="text-sm text-text-secondary dark:text-white/85">Manage global website configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium shadow-lg hover:shadow-xl disabled:opacity-50 transition-all">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium">{message}</div>
      )}

      <div className="card p-6 space-y-5">
        {settingFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-primary dark:text-white mb-2">{field.label}</label>
            <input
              type={field.type}
              value={settings[field.key] || ''}
              onChange={(e) => updateSetting(field.key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-surface-dark text-sm text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
