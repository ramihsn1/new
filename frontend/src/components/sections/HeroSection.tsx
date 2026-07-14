'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

const heroData: Record<string, { label: string; title: (lang: string) => React.ReactNode }> = {
  en: {
    label: 'Political & Legal Research',
    title: () => <>Jerusalem Institute for <span className="text-[#a89060]">Political</span> and <span className="text-[#a89060]">Legal</span> Relations</>,
  },
  ar: {
    label: 'البحوث السياسية والقانونية',
    title: () => <>معهد القدس <span className="text-[#a89060]">للعلاقات السياسية</span> <span className="text-[#a89060]">والقانونية</span></>,
  },
  tr: {
    label: 'Siyasi ve Hukuki Araştırma',
    title: () => <>Kudüs <span className="text-[#a89060]">Siyasi</span> ve <span className="text-[#a89060]">Hukuki</span> İlişkiler Enstitüsü</>,
  },
};

export default function HeroSection({ locale, t }: { locale: Locale; t: ReturnType<typeof useTranslation> }) {
  const data = heroData[locale] || heroData.en;

  return (
    <section className="hero min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-px h-64 bg-accent/30" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-px bg-accent/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="max-w-4xl">
          <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-8">{data.label}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8 tracking-tight">
            {data.title(locale)}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10">{t.home.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/about`} className="inline-flex px-8 py-4 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-accent hover:text-white transition-colors">
              {t.home.heroCta1}
            </Link>
            <Link href={`/${locale}/contact`} className="inline-flex px-8 py-4 border border-neutral-600 text-white text-sm font-semibold uppercase tracking-wider hover:border-white transition-colors">
              {t.home.heroCta2}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
