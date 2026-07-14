'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function PublicationsPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Publications' : locale === 'ar' ? 'المنشورات' : 'Yayınlar';
  const [active, setActive] = useState('all');
  const cats = { en: { all: 'All', report: 'Reports', policy_paper: 'Policy Papers', research: 'Research' }, ar: { all: 'الكل', report: 'تقارير', policy_paper: 'أوراق سياسات', research: 'بحوث' }, tr: { all: 'Tümü', report: 'Raporlar', policy_paper: 'Politika Belgeleri', research: 'Araştırma' } };
  const catLabels = cats[locale];
  const pubs = [
    { id: 1, title: locale === 'en' ? 'Annual Report 2025' : locale === 'ar' ? 'التقرير السنوي 2025' : 'Yıllık Rapor 2025', cat: 'report', date: '2026-05-15' },
    { id: 2, title: locale === 'en' ? 'Migration Governance Brief' : locale === 'ar' ? 'موجز إدارة الهجرة' : 'Göç Yönetişimi Notu', cat: 'policy_paper', date: '2026-04-20' },
    { id: 3, title: locale === 'en' ? 'Middle East Geopolitics' : locale === 'ar' ? 'جغرافيا الشرق الأوسط' : 'Orta Doğu Jeopolitiği', cat: 'research', date: '2026-03-10' },
    { id: 4, title: locale === 'en' ? 'Trade Law Framework' : locale === 'ar' ? 'إطار قانون التجارة' : 'Ticaret Hukuku Çerçevesi', cat: 'research', date: '2026-02-28' },
  ];
  const filtered = active === 'all' ? pubs : pubs.filter(p => p.cat === active);

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="flex flex-wrap justify-center gap-2 mb-10">{Object.entries(catLabels).map(([k, v]) => <button key={k} onClick={() => setActive(k)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${active === k ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-surface-dark text-primary dark:text-white/95'}`}>{v}</button>)}</div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map((p, i) => <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} layout className="card p-6 group hover:-translate-y-1 transition-all"><span className="inline-block px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-xs font-medium mb-3">{(catLabels as any)[p.cat]}</span><h3 className="font-bold text-primary dark:text-white mb-2">{p.title}</h3><p className="text-xs text-primary mb-4">{p.date}</p><button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-medium">PDF</button></motion.div>)}</div></div></section>
    </div>
  );
}
