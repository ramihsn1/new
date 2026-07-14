'use client';

import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';
import HeroSection from '@/components/sections/HeroSection';
import MissionSection from '@/components/sections/MissionSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import NewsSection from '@/components/sections/NewsSection';
import EventsSection from '@/components/sections/EventsSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage({ locale }: { locale: Locale }) {
  const t = useTranslation(locale);

  return (
    <div>
      <HeroSection locale={locale} t={t} />
      <MissionSection locale={locale} t={t} />
      <ServicesGrid locale={locale} t={t} />
      <NewsSection locale={locale} t={t} />
      <EventsSection locale={locale} t={t} />
      <CTASection locale={locale} t={t} />
    </div>
  );
}
