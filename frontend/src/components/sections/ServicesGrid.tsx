'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

const serviceData: Record<string, { title: string; items: { id: string; title: string; desc: string }[] }> = {
  en: {
    title: 'Areas of expertise.',
    items: [
      { id: '01', title: 'Political Research', desc: 'In-depth political and electoral analysis for informed governance.' },
      { id: '02', title: 'Legal Studies', desc: 'Comparative law, international legal frameworks, and human rights.' },
      { id: '03', title: 'Policy Analysis', desc: 'Evidence-based recommendations for public and private sectors.' },
      { id: '04', title: 'Strategic Consulting', desc: 'Advisory for organizational development and diplomatic strategy.' },
      { id: '05', title: 'Conferences', desc: 'International symposiums, roundtables, and high-level meetings.' },
      { id: '06', title: 'Publications', desc: 'Research reports, policy papers, and academic publications.' },
    ],
  },
  ar: {
    title: 'مجالات الخبرة.',
    items: [
      { id: '01', title: 'البحث السياسي', desc: 'تحليل سياسي وانتخابي متعمق.' },
      { id: '02', title: 'الدراسات القانونية', desc: 'القانون المقارن والأطر القانونية الدولية.' },
      { id: '03', title: 'تحليل السياسات', desc: 'توصيات قائمة على الأدلة للقطاعين العام والخاص.' },
      { id: '04', title: 'الاستشارات الاستراتيجية', desc: 'استشارات للتطوير التنظيمي والاستراتيجية الدبلوماسية.' },
      { id: '05', title: 'المؤتمرات', desc: 'ندوات دولية وموائد مستديرة.' },
      { id: '06', title: 'المنشورات', desc: 'تقارير بحثية وأوراق سياسات.' },
    ],
  },
  tr: {
    title: 'Uzmanlık alanları.',
    items: [
      { id: '01', title: 'Siyasi Araştırma', desc: 'Bilinçli yönetişim için kapsamlı siyasi analiz.' },
      { id: '02', title: 'Hukuk Çalışmaları', desc: 'Karşılaştırmalı hukuk ve uluslararası hukuki çerçeveler.' },
      { id: '03', title: 'Politika Analizi', desc: 'Kamu ve özel sektör için kanıta dayalı öneriler.' },
      { id: '04', title: 'Stratejik Danışmanlık', desc: 'Organizasyonel gelişim ve diplomatik strateji danışmanlığı.' },
      { id: '05', title: 'Konferanslar', desc: 'Uluslararası sempozyumlar ve üst düzey toplantılar.' },
      { id: '06', title: 'Yayınlar', desc: 'Araştırma raporları ve politika belgeleri.' },
    ],
  },
};

const learnMore: Record<string, string> = {
  en: 'Learn more →',
  ar: 'اعرف المزيد ←',
  tr: 'Detaylar →',
};

export default function ServicesGrid({ locale, t }: { locale: Locale; t: ReturnType<typeof useTranslation> }) {
  const data = serviceData[locale] || serviceData.en;

  return (
    <section className="pad border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.home.servicesOverview}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{data.title}</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800">
          {data.items.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-[var(--background)] p-8 lg:p-10 group hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              <span className="text-xs text-[#a89060] font-mono mb-6 block">{s.id}</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{s.desc}</p>
              <Link href={`/${locale}/services`} className="text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-[#a89060] transition-colors">
                {learnMore[locale]}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
