import { ReactNode } from 'react';
import { siteConfig, Locale } from '@/lib/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/layout/ThemeProvider';

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = (localeParam || 'en') as Locale;
  const dir = siteConfig.localeDirections[locale] || 'ltr';

  return (
    <ThemeProvider>
      <div dir={dir} className={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Header locale={locale} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer locale={locale} />
      </div>
    </ThemeProvider>
  );
}
