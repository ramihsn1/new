import TeamPage from './TeamPage';
import { Locale } from '@/lib/config';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <TeamPage locale={locale as Locale} />;
}
