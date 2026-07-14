import ContactPage from './ContactPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ContactPage locale={locale as Locale} />;
}
