import PartnersPage from './PartnersPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PartnersPage locale={locale as Locale} />;
}
