'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

const missionTitles: Record<string, string> = {
  en: 'Advancing knowledge through independent research and analysis.',
  ar: 'تطوير المعرفة من خلال البحث والتحليل المستقل.',
  tr: 'Bağımsız araştırma ve analiz yoluyla bilgiyi ilerletmek.',
};

const missionTexts: Record<string, string> = {
  en: 'An independent organization dedicated to rigorous political research, legal analysis, and policy advisory. We produce evidence-based insights that inform decision-making at the highest levels.',
  ar: 'منظمة مستقلة مكرسة للبحث السياسي الدقيق والتحليل القانوني والاستشارات السياسية. ننتج رؤى قائمة على الأدلة توجه عملية صنع القرار على أعلى المستويات.',
  tr: 'Titiz siyasi araştırma, hukuki analiz ve politika danışmanlığına adanmış bağımsız bir kuruluş. En üst düzeyde karar alma süreçlerini bilgilendiren kanıta dayalı içgörüler üretiyoruz.',
};

export default function MissionSection({ locale, t }: { locale: Locale; t: ReturnType<typeof useTranslation> }) {
  const stats = [
    { value: '150+', label: t.home.statsPublications },
    { value: '45+', label: t.home.statsEvents },
    { value: '30+', label: t.home.statsProjects },
    { value: '25+', label: t.home.statsExperts },
  ];

  return (
    <section className="pad">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-6">{t.home.aboutPreview}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8 tracking-tight">
              {missionTitles[locale]}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {missionTexts[locale]}
            </p>
            <Link href={`/${locale}/about`} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white hover:text-[#a89060] transition-colors">
              {t.home.readMore} <span>→</span>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-2 gap-1">
              {stats.map((s, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-800 p-8 lg:p-10">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{s.value}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
