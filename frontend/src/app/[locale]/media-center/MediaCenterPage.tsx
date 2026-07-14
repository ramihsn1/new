'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function MediaCenterPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Media Center' : locale === 'ar' ? 'المركز الإعلامي' : 'Medya Merkezi';
  const [tab, setTab] = useState('photos');
  const tabs = { en: { photos: 'Photos', videos: 'Videos', documents: 'Documents', press: 'Press Releases' }, ar: { photos: 'صور', videos: 'فيديوهات', documents: 'وثائق', press: 'بيانات صحفية' }, tr: { photos: 'Fotoğraflar', videos: 'Videolar', documents: 'Belgeler', press: 'Basın Bültenleri' } };
  const tl = tabs[locale];
  const items = Array(8).fill(null).map((_, i) => ({ id: i + 1 }));

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="flex justify-center gap-2 mb-10">{Object.entries(tl).map(([k, v]) => <button key={k} onClick={() => setTab(k)} className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${tab === k ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-surface-dark text-primary'}`}>{v}</button>)}</div><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{items.map((item, i) => <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} layout className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center cursor-pointer card hover:scale-[1.02] transition-all"><span className="text-3xl">{tab === 'photos' ? '📷' : tab === 'videos' ? '🎬' : tab === 'documents' ? '📄' : '📰'}</span></motion.div>)}</div><div className="text-center mt-8"><input type="text" placeholder={locale === 'en' ? 'Search media...' : locale === 'ar' ? 'بحث...' : 'Ara...'} className="w-80 px-6 py-3 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-sm" /></div></div></section>
    </div>
  );
}
