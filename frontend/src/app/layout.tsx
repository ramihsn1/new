import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Jerusalem Institute for Political and Legal Relations',
    template: '%s | Al Quds Institute',
  },
  description:
    'An independent organization specializing in political affairs, legal studies, policy research, strategic analysis, and international relations.',
  keywords: [
    'political research',
    'legal studies',
    'policy analysis',
    'international relations',
    'strategic consulting',
    'Jerusalem',
    'Al Quds',
    'think tank',
  ],
  authors: [{ name: 'Al Quds Institute' }],
  creator: 'Al Quds Institute',
  metadataBase: new URL('https://alqudsinstitute.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Al Quds Institute',
    title: 'Jerusalem Institute for Political and Legal Relations',
    description:
      'Independent Research, Strategic Analysis, and International Relations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Quds Institute',
    description:
      'Independent Research, Strategic Analysis, and International Relations',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
