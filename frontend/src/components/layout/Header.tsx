'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useTranslation } from '@/i18n/translations';
import { Locale, siteConfig } from '@/lib/config';

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslation(locale);
  const { dark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (siteConfig.locales.includes(segments[0] as any)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push('/' + segments.join('/'));
  };

  const navItems = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/publications`, label: t.nav.publications },
    { href: `/${locale}/news`, label: t.nav.news },
    { href: `/${locale}/events`, label: t.nav.events },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  const isScrolled = scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            {isScrolled ? (
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
            ) : (
              <>
                <img src="/images/logo.png" alt="Logo" className="h-8 w-auto dark:hidden" />
                <img src="/images/white-logo.png" alt="Logo" className="h-8 w-auto hidden dark:block" />
              </>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className={`text-xs font-medium uppercase tracking-wide transition-colors ${
                  isScrolled
                    ? 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    : 'text-neutral-400 hover:text-white dark:text-gray-400 dark:hover:text-white'
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {siteConfig.locales.map((l) => (
              <button key={l} onClick={() => switchLocale(l)}
                className={`text-xs font-medium uppercase tracking-wide transition-colors ${
                  locale === l ? 'text-white dark:text-white' : `text-neutral-400 hover:text-white dark:text-gray-400 dark:hover:text-white`
                }`}>{l}</button>
            ))}
            <span className="text-neutral-600 dark:text-gray-700">|</span>
            <button onClick={toggleTheme} className="text-neutral-400 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {dark
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                }
              </svg>
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-neutral-400 hover:text-white dark:text-gray-400 dark:hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3 pb-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">{item.label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
