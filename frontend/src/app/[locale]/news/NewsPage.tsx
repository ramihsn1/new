'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function NewsPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'News' : locale === 'ar' ? 'الأخبار' : 'Haberler';
  const [active, setActive] = useState('all');
  const cats = { en: { all: 'All', policy: 'Policy', legal: 'Legal', research: 'Research', events: 'Events' }, ar: { all: 'الكل', policy: 'سياسات', legal: 'قانوني', research: 'بحث', events: 'فعاليات' }, tr: { all: 'Tümü', policy: 'Politika', legal: 'Hukuk', research: 'Araştırma', events: 'Etkinlikler' } };
  const catLabels = cats[locale];
  const items = [
    { id: 1, title: locale === 'en' ? 'Regional Cooperation Framework' : locale === 'ar' ? 'إطار التعاون الإقليمي' : 'Bölgesel İşbirliği Çerçevesi', cat: 'policy', date: '2026-06-15' },
    { id: 2, title: locale === 'en' ? 'International Law Symposium' : locale === 'ar' ? 'ندوة القانون الدولي' : 'Uluslararası Hukuk Sempozyumu', cat: 'legal', date: '2026-06-10' },
    { id: 3, title: locale === 'en' ? 'Middle East Stability Research' : locale === 'ar' ? 'بحث استقرار الشرق الأوسط' : 'Orta Doğu İstikrar Araştırması', cat: 'research', date: '2026-06-05' },
    { id: 4, title: locale === 'en' ? 'Diplomatic Relations Conference' : locale === 'ar' ? 'مؤتمر العلاقات الدبلوماسية' : 'Diplomatik İlişkiler Konferansı', cat: 'events', date: '2026-05-28' },
    { id: 5, title: locale === 'en' ? 'UN Cooperation Agreement' : locale === 'ar' ? 'اتفاقية تعاون مع الأمم المتحدة' : 'BM İşbirliği Anlaşması', cat: 'policy', date: '2026-05-20' },
  ];
  const filtered = active === 'all' ? items : items.filter(n => n.cat === active);

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="flex flex-wrap justify-center gap-2 mb-10">{Object.entries(catLabels).map(([k, v]) => <button key={k} onClick={() => setActive(k)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${active === k ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-surface-dark text-primary dark:text-white/95'}`}>{v}</button>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map((item, i) => <motion.article key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} layout className="card overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all"><div className="h-48 bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center relative"><span className="text-white/20 text-7xl font-bold">{String(item.id).padStart(2, '0')}</span><span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-medium">{(catLabels as any)[item.cat]}</span></div><div className="p-6"><p className="text-xs text-primary mb-2">{item.date}</p><h3 className="font-bold text-primary dark:text-white mb-3 line-clamp-2">{item.title}</h3><Link href={`/${locale}/news/${item.id}`} className="text-sm font-medium text-secondary">Read More →</Link></div></motion.article>)}</div></div></section>
    </div>
  );
}
