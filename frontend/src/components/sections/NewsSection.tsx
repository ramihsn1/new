'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

const newsData: Record<string, { date: string; tag: string; title: string }[]> = {
  en: [
    { date: '15.06.2026', tag: 'Policy', title: 'New Regional Cooperation Framework' },
    { date: '10.06.2026', tag: 'Legal', title: 'International Law Symposium 2026' },
    { date: '05.06.2026', tag: 'Research', title: 'Report: Middle East Geopolitics' },
  ],
  ar: [
    { date: '15.06.2026', tag: 'سياسات', title: 'إطار تعاون إقليمي جديد' },
    { date: '10.06.2026', tag: 'قانوني', title: 'ندوة القانون الدولي 2026' },
    { date: '05.06.2026', tag: 'بحث', title: 'تقرير: الجغرافيا السياسية للشرق الأوسط' },
  ],
  tr: [
    { date: '15.06.2026', tag: 'Politika', title: 'Yeni Bölgesel İşbirliği Çerçevesi' },
    { date: '10.06.2026', tag: 'Hukuk', title: 'Uluslararası Hukuk Sempozyumu 2026' },
    { date: '05.06.2026', tag: 'Araştırma', title: 'Rapor: Orta Doğu Jeopolitiği' },
  ],
};

export default function NewsSection({ locale, t }: { locale: Locale; t: ReturnType<typeof useTranslation> }) {
  const items = newsData[locale] || newsData.en;
  const headline: Record<string, string> = {
    en: 'Latest insights.',
    ar: 'آخر الرؤى.',
    tr: 'Son gelişmeler.',
  };

  return (
    <section className="pad bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.home.latestNews}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{headline[locale]}</h2>
          </div>
          <Link href={`/${locale}/news`} className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#a89060] transition-colors">{t.home.viewAll} →</Link>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="py-6 flex flex-col sm:flex-row sm:items-center gap-4 group cursor-pointer">
              <div className="flex items-center gap-4 sm:w-48 shrink-0">
                <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-gray-300 dark:border-gray-700 text-gray-600">{item.tag}</span>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-[#a89060] transition-colors flex-1">{item.title}</h3>
              <Link href={`/${locale}/news`} className="text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-[#a89060] transition-colors shrink-0">
                {t.home.readMore} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
