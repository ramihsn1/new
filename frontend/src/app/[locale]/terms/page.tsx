import TermsPage from './TermsPage';
import { Locale } from '@/lib/config';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TermsPage locale={locale as Locale} />;
}
