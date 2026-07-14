'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

export default function ContactPage({ locale }: { locale: Locale }) {
  const t = useTranslation(locale);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/public/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.contact.title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: locale === 'ar' ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-3">{t.contact.title}</h2>
          <p className="text-primary mb-8">{t.contact.subtitle}</p>
          <div className="space-y-5">
            {[
              { icon: '✉️', label: t.contact.email, val: 'info@alqudsinstitute.org' },
              { icon: '📞', label: t.contact.phone, val: '+90 (212) 555 0123' },
              { icon: '📍', label: t.contact.address, val: locale === 'en' ? 'Istanbul, Turkey' : locale === 'ar' ? 'اسطنبول، تركيا' : 'İstanbul, Türkiye' },
            ].map(item => <div key={item.label} className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 text-lg">{item.icon}</div><div><p className="font-bold text-primary text-sm">{item.label}</p><p className="text-text-secondary text-sm">{item.val}</p></div></div>)}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: locale === 'ar' ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium mb-2">{t.contact.name}</label><input type="text" name="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" /></div>
              <div><label className="block text-sm font-medium mb-2">{t.contact.email}</label><input type="email" name="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium mb-2">{t.contact.phone}</label><input type="tel" name="phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" /></div>
              <div><label className="block text-sm font-medium mb-2">{t.contact.subject}</label><input type="text" name="subject" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-2">{t.contact.message}</label><textarea name="message" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={5} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none" /></div>
            <button type="submit" className="w-full py-4 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">{t.contact.send}</button>
            {status === 'success' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 text-sm text-center">{t.contact.formSuccess}</motion.p>}
            {status === 'error' && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm text-center">{t.contact.formError}</motion.p>}
          </form>
        </motion.div>
      </div>
      <div className="mt-12 card p-2 rounded-3xl overflow-hidden h-80"><div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-2xl"><p className="text-sm text-text-muted">{locale === 'en' ? 'Google Maps' : locale === 'ar' ? 'خرائط جوجل' : 'Google Haritalar'}</p></div></div>
      </div></section>
    </div>
  );
}
