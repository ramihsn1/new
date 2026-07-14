'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

export default function CTASection({ locale, t }: { locale: Locale; t: ReturnType<typeof useTranslation> }) {
  return (
    <section className="pad wall-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{t.home.ctaTitle}</h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-8">{t.home.ctaText}</p>
          <Link href={`/${locale}/contact`} className="inline-flex px-8 py-4 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-accent hover:text-white transition-colors">
            {t.home.ctaButton}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
