'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

export default function AboutPage({ locale }: { locale: Locale }) {
  const t = useTranslation(locale);

  return (
    <div>
      <section className="hero pt-32 pb-24 px-6 lg:px-10">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.about.title}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {locale === 'en' ? 'Independent research. Global impact.' : locale === 'ar' ? 'بحوث مستقلة. تأثير عالمي.' : 'Bağımsız araştırma. Küresel etki.'}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pad max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.about.overview}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {locale === 'en' ? 'The Jerusalem Institute for Political and Legal Relations is an independent, non-profit organization established to advance rigorous research, analysis, and dialogue in political affairs, legal studies, and international relations.' : locale === 'ar' ? 'معهد القدس للعلاقات السياسية والقانونية هو منظمة مستقلة غير ربحية تأسست لتطوير البحث والتحليل الدقيق والحوار في الشؤون السياسية والدراسات القانونية والعلاقات الدولية.' : 'Kudüs Siyasi ve Hukuki İlişkiler Enstitüsü, siyasi işler, hukuk çalışmaları ve uluslararası ilişkiler alanında titiz araştırma, analiz ve diyaloğu ilerletmek için kurulmuş bağımsız, kar amacı gütmeyen bir kuruluştur.'}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <img src="/images/white-logo.png" alt="Al Quds Institute" className="h-10 w-auto mb-8" />
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">{t.about.vision}</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.about.visionText}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">{t.about.mission}</p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.about.missionText}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pad bg-gray-50 dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.about.values}</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">
            {locale === 'en' ? 'What we stand for.' : locale === 'ar' ? 'ما ندافع عنه.' : 'Savunduklarımız.'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-1 bg-gray-200 dark:bg-gray-800">
            {t.about.valuesList.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-gray-50 dark:bg-gray-950 p-8">
                <span className="text-xs text-[#a89060] font-mono block mb-4">0{i + 1}</span>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pad max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{t.about.objectives}</p>
        <div className="grid sm:grid-cols-2 gap-8">
          {(locale === 'en' ? ['Conduct high-quality research', 'Provide evidence-based policy recommendations', 'Facilitate stakeholder dialogue', 'Build capacity through training', 'Publish accessible analysis', 'Foster international cooperation'] : locale === 'ar' ? ['إجراء بحوث عالية الجودة', 'تقديم توصيات سياسات قائمة على الأدلة', 'تسهيل الحوار بين أصحاب المصلحة', 'بناء القدرات من خلال التدريب', 'نشر تحليلات متاحة', 'تعزيز التعاون الدولي'] : ['Yüksek kaliteli araştırma', 'Kanıta dayalı politika önerileri', 'Paydaş diyaloğunu kolaylaştırma', 'Eğitimle kapasite geliştirme', 'Erişilebilir analiz yayınlama', 'Uluslararası işbirliğini teşvik']).map((obj, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-[#a89060] text-xl font-bold leading-none mt-0.5">—</span>
              <span className="text-gray-800 dark:text-gray-400 text-lg">{obj}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
