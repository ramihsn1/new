import PrivacyPage from './PrivacyPage';
import { Locale } from '@/lib/config';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyPage locale={locale as Locale} />;
}
