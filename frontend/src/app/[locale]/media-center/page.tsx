import MediaCenterPage from './MediaCenterPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MediaCenterPage locale={locale as Locale} />;
}
