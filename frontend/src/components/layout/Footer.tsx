'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/i18n/translations';
import { Locale } from '@/lib/config';

export default function Footer({ locale }: { locale: Locale }) {
  const t = useTranslation(locale);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/public/newsletter`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
      });
      setSubscribed(true); setEmail('');
    } catch {}
  };

  const links = [
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/publications`, label: t.nav.publications },
    { href: `/${locale}/news`, label: t.nav.news },
    { href: `/${locale}/events`, label: t.nav.events },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/team`, label: t.nav.team },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <footer className="bg-gray-950 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <img src="/images/white-logo.png" alt="Al Quds Institute" className="h-8 w-auto mb-6" />
            <p className="text-sm leading-relaxed text-neutral-400">
              {locale === 'en' ? 'Independent research, strategic analysis, and international relations.' : locale === 'ar' ? 'بحوث مستقلة وتحليل استراتيجي وعلاقات دولية.' : 'Bağımsız araştırma, stratejik analiz ve uluslararası ilişkiler.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-200 mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-neutral-300 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-200 mb-6">{t.footer.contactInfo}</h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <p>info@alqudsinstitute.org</p>
              <p>+90 (212) 555 0123</p>
              <p>{locale === 'en' ? 'Istanbul, Turkey' : locale === 'ar' ? 'اسطنبول، تركيا' : 'İstanbul, Türkiye'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-200 mb-6">{t.footer.newsletter}</h4>
            <p className="text-sm text-neutral-300 mb-4">
              {locale === 'en' ? 'Subscribe for research updates and event invitations.' : locale === 'ar' ? 'اشترك للحصول على تحديثات البحوث ودعوات الفعاليات.' : 'Araştırma güncellemeleri ve etkinlik davetleri için abone olun.'}
            </p>
            {subscribed ? (
              <p className="text-sm text-[#a89060]">{t.footer.subscribeSuccess}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 text-neutral-200 text-sm placeholder-neutral-500 focus:outline-none focus:border-accent/50 transition-colors" />
                <button type="submit" className="px-5 py-2.5 bg-white text-black text-sm font-medium hover:bg-accent hover:text-white transition-colors">
                  {t.footer.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Al Quds Institute. {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-neutral-300 transition-colors">{t.footer.privacy}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-neutral-300 transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
