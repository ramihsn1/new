import NewsPage from './NewsPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <NewsPage locale={locale as Locale} />;
}
