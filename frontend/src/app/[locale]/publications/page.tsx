import PublicationsPage from './PublicationsPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicationsPage locale={locale as Locale} />;
}
