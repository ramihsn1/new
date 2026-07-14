'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function TeamPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Our Team' : locale === 'ar' ? 'فريقنا' : 'Ekibimiz';
  const team = [
    { name: 'Dr. Ibrahim Al-Hassan', position: locale === 'en' ? 'Executive Director' : locale === 'ar' ? 'المدير التنفيذي' : 'İcra Direktörü' },
    { name: 'Prof. Leyla Kaya', position: locale === 'en' ? 'Director of Research' : locale === 'ar' ? 'مديرة البحوث' : 'Araştırma Direktörü' },
    { name: 'Dr. Omar Farouk', position: locale === 'en' ? 'Senior Legal Advisor' : locale === 'ar' ? 'المستشار القانوني الأول' : 'Kıdemli Hukuk Danışmanı' },
    { name: 'Dr. Amina Rashid', position: locale === 'en' ? 'Policy Research Director' : locale === 'ar' ? 'مديرة بحوث السياسات' : 'Politika Araştırma Direktörü' },
    { name: 'Hassan Yildirim', position: locale === 'en' ? 'International Relations Director' : locale === 'ar' ? 'مدير العلاقات الدولية' : 'Uluslararası İlişkiler Direktörü' },
    { name: 'Fatima Zahra', position: locale === 'en' ? 'Programs Director' : locale === 'ar' ? 'مديرة البرامج' : 'Programlar Direktörü' },
    { name: 'Dr. Mustafa Kemal', position: locale === 'en' ? 'Senior Researcher' : locale === 'ar' ? 'باحث أول' : 'Kıdemli Araştırmacı' },
    { name: 'Zeinab Ali', position: locale === 'en' ? 'Communications Director' : locale === 'ar' ? 'مديرة الاتصالات' : 'İletişim Direktörü' },
  ];

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{team.map((m, i) => <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-6 text-center group hover:-translate-y-1 transition-all"><div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4"><span className="text-3xl font-bold text-primary">{m.name.split(' ').pop()?.[0] || '?'}</span></div><h3 className="font-bold text-primary dark:text-white mb-1">{m.name}</h3><p className="text-sm text-text-secondary mb-3">{m.position}</p><div className="flex justify-center gap-2">{['in','tw','em'].map(s => <span key={s} className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-xs text-primary hover:text-secondary hover:bg-secondary/10 transition-all cursor-pointer">{s}</span>)}</div></motion.div>)}</div></div></section>
    </div>
  );
}
