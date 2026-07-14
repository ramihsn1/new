'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

const eventsData: Record<string, { date: string; loc: string; title: string }[]> = {
  en: [
    { date: '20.09.2026', loc: 'Istanbul', title: 'International Conference on Peace and Diplomacy' },
    { date: '15.08.2026', loc: 'Online', title: 'Workshop: International Law and Human Rights' },
    { date: '25.07.2026', loc: 'Geneva', title: 'Policy Forum: Regional Stability' },
  ],
  ar: [
    { date: '20.09.2026', loc: 'اسطنبول', title: 'المؤتمر الدولي للسلام والدبلوماسية' },
    { date: '15.08.2026', loc: 'عبر الإنترنت', title: 'ورشة: القانون الدولي وحقوق الإنسان' },
    { date: '25.07.2026', loc: 'جنيف', title: 'منتدى السياسات: الاستقرار الإقليمي' },
  ],
  tr: [
    { date: '20.09.2026', loc: 'İstanbul', title: 'Uluslararası Barış ve Diplomasi Konferansı' },
    { date: '15.08.2026', loc: 'Çevrimiçi', title: 'Çalıştay: Uluslararası Hukuk ve İnsan Hakları' },
    { date: '25.07.2026', loc: 'Cenevre', title: 'Politika Forumu: Bölgesel İstikrar' },
  ],
};

export default function EventsSection({ locale, t }: { locale: Locale; t: ReturnType<typeof useTranslation> }) {
  const events = eventsData[locale] || eventsData.en;
  const headline: Record<string, string> = {
    en: 'Upcoming events.',
    ar: 'الفعاليات القادمة.',
    tr: 'Yaklaşan etkinlikler.',
  };

  return (
    <section className="pad">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.home.upcomingEvents}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{headline[locale]}</h2>
          </div>
          <Link href={`/${locale}/events`} className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#a89060] transition-colors">{t.home.viewAll} →</Link>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {events.map((ev, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="py-6 flex flex-col sm:flex-row sm:items-center gap-4 group cursor-pointer">
              <div className="flex items-center gap-4 sm:w-48 shrink-0">
                <span className="text-xs text-gray-500 font-mono">{ev.date}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-600">{ev.loc}</span>
              </div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-[#a89060] transition-colors flex-1">{ev.title}</h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-[#a89060] transition-colors shrink-0">
                {t.home.register} →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
