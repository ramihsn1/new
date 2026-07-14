export const siteConfig = {
  name: 'Jerusalem Institute for Political and Legal Relations',
  shortName: 'Al Quds Institute',
  description: 'An independent organization specializing in political affairs, legal studies, policy research, strategic analysis, and international relations.',
  url: 'https://alqudsinstitute.org',
  ogImage: '/images/og-image.jpg',
  locale: 'en',
  locales: ['en', 'ar', 'tr'] as const,
  localeNames: {
    en: 'English',
    ar: 'العربية',
    tr: 'Türkçe',
  },
  localeDirections: {
    en: 'ltr',
    ar: 'rtl',
    tr: 'ltr',
  },
  theme: {
    colors: {
      primary: '#1B2A4A',
      primaryLight: '#2D4373',
      primaryDark: '#0F1B33',
      secondary: '#C5A43E',
      secondaryLight: '#D4B85C',
      secondaryDark: '#A68A2E',
      accent: '#5B7DB1',
      accentLight: '#7B9AD1',
      background: '#F8F9FC',
      surface: '#FFFFFF',
      surfaceAlt: '#F1F3F8',
      text: '#1A1D26',
      textSecondary: '#5A6170',
      textMuted: '#8B91A0',
      border: '#E2E5ED',
      error: '#D32F2F',
      success: '#2E7D32',
      warning: '#ED6C02',
      info: '#0288D1',
    },
  },
};

export type Locale = (typeof siteConfig.locales)[number];
