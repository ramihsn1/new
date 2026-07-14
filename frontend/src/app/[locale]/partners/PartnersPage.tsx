'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function PartnersPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Our Partners' : locale === 'ar' ? 'شركاؤنا' : 'Ortaklarımız';
  const partners = Array(12).fill(null).map((_, i) => ({ id: i + 1, cat: i < 4 ? (locale === 'en' ? 'Government' : locale === 'ar' ? 'حكومي' : 'Hükümet') : i < 8 ? (locale === 'en' ? 'International' : locale === 'ar' ? 'دولي' : 'Uluslararası') : (locale === 'en' ? 'NGO' : locale === 'ar' ? 'غير حكومية' : 'STK') }));

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{partners.map((p, i) => <motion.div key={p.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-8 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all min-h-[160px]"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3"><span className="text-lg font-bold text-text-muted">P{i + 1}</span></div><p className="text-xs text-text-secondary">Partner {i + 1}</p><span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/10 text-secondary mt-1">{p.cat}</span></motion.div>)}</div></div></section>
    </div>
  );
}
