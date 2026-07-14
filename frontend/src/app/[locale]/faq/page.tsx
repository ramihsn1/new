import FAQPage from './FAQPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <FAQPage locale={locale as Locale} />;
}
