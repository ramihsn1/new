'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function EventsPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Events & Conferences' : locale === 'ar' ? 'الفعاليات والمؤتمرات' : 'Etkinlikler ve Konferanslar';
  const events = [
    { id: 1, title: locale === 'en' ? 'Peace and Diplomacy Conference 2026' : locale === 'ar' ? 'مؤتمر السلام والدبلوماسية 2026' : 'Barış ve Diplomasi Konferansı 2026', date: '2026-09-20', location: locale === 'en' ? 'Istanbul, Turkey' : locale === 'ar' ? 'اسطنبول، تركيا' : 'İstanbul, Türkiye', type: locale === 'en' ? 'Conference' : locale === 'ar' ? 'مؤتمر' : 'Konferans' },
    { id: 2, title: locale === 'en' ? 'International Law Workshop' : locale === 'ar' ? 'ورشة القانون الدولي' : 'Uluslararası Hukuk Çalıştayı', date: '2026-08-15', location: locale === 'en' ? 'Online' : locale === 'ar' ? 'عبر الإنترنت' : 'Çevrimiçi', type: locale === 'en' ? 'Workshop' : locale === 'ar' ? 'ورشة عمل' : 'Çalıştay' },
    { id: 3, title: locale === 'en' ? 'Policy Forum: Regional Stability' : locale === 'ar' ? 'منتدى السياسات: الاستقرار الإقليمي' : 'Politika Forumu: Bölgesel İstikrar', date: '2026-07-25', location: locale === 'en' ? 'Geneva, Switzerland' : locale === 'ar' ? 'جنيف، سويسرا' : 'Cenevre, İsviçre', type: locale === 'en' ? 'Forum' : locale === 'ar' ? 'منتدى' : 'Forum' },
    { id: 4, title: locale === 'en' ? 'Legal Reform Roundtable' : locale === 'ar' ? 'طاولة الإصلاح القانوني' : 'Hukuk Reformu Yuvarlak Masası', date: '2026-04-10', location: locale === 'en' ? 'Ankara, Turkey' : locale === 'ar' ? 'أنقرة، تركيا' : 'Ankara, Türkiye', type: locale === 'en' ? 'Roundtable' : locale === 'ar' ? 'مائدة مستديرة' : 'Yuvarlak Masa' },
  ];

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="space-y-4">{events.map((event, i) => <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center group hover:-translate-y-0.5 transition-all"><div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex flex-col items-center justify-center shrink-0"><span className="text-2xl font-bold text-secondary">{new Date(event.date).getDate()}</span><span className="text-xs text-secondary/70">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span></div><div className="flex-1"><span className="inline-block px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-xs font-medium mb-2">{event.type}</span><h3 className="text-lg font-bold text-primary dark:text-white">{event.title}</h3><div className="flex flex-wrap gap-4 mt-2 text-sm text-text-secondary"><span>{event.location}</span><span>{event.date}</span></div></div><Link href={`/${locale}/events/${event.id}`} className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors shrink-0">Details</Link></motion.div>)}</div></div></section>
    </div>
  );
}
