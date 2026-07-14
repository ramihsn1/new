'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Our Projects' : locale === 'ar' ? 'مشاريعنا' : 'Projelerimiz';
  const projects = [
    { id: 1, title: locale === 'en' ? 'Regional Policy Dialogue' : locale === 'ar' ? 'الحوار الإقليمي للسياسات' : 'Bölgesel Politika Diyalogu', status: 'ongoing', year: '2024-2026' },
    { id: 2, title: locale === 'en' ? 'Legal Reform Advisory' : locale === 'ar' ? 'استشارات الإصلاح القانوني' : 'Hukuk Reformu Danışmanlığı', status: 'completed', year: '2023-2025' },
    { id: 3, title: locale === 'en' ? 'International Mediation Support' : locale === 'ar' ? 'دعم الوساطة الدولية' : 'Uluslararası Arabuluculuk', status: 'ongoing', year: '2025-2027' },
    { id: 4, title: locale === 'en' ? 'Capacity Building Program' : locale === 'ar' ? 'برنامج بناء القدرات' : 'Kapasite Geliştirme Programı', status: 'ongoing', year: '2025-2026' },
    { id: 5, title: locale === 'en' ? 'Cross-Border Cooperation' : locale === 'ar' ? 'التعاون عبر الحدود' : 'Sınır Ötesi İşbirliği', status: 'completed', year: '2022-2024' },
    { id: 6, title: locale === 'en' ? 'Human Rights Monitoring' : locale === 'ar' ? 'مراقبة حقوق الإنسان' : 'İnsan Hakları İzleme', status: 'ongoing', year: '2024-2026' },
  ];
  const statusLabels = { en: { ongoing: 'Ongoing', completed: 'Completed' }, ar: { ongoing: 'جاري', completed: 'مكتمل' }, tr: { ongoing: 'Devam Ediyor', completed: 'Tamamlandı' } };
  const st = statusLabels[locale];

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-7xl mx-auto"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map((proj, i) => <motion.div key={proj.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-6 group hover:-translate-y-1 transition-all"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 text-2xl font-bold text-[#a89060]">{String(proj.id).padStart(2, '0')}</div><div className="flex items-center gap-2 mb-3"><span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${proj.status === 'ongoing' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>{(st as any)[proj.status]}</span><span className="text-xs text-primary">{proj.year}</span></div><h3 className="font-bold text-primary dark:text-white mb-3">{proj.title}</h3><Link href={`/${locale}/projects/${proj.id}`} className="text-sm font-medium text-secondary">View Project →</Link></motion.div>)}</div></div></section>
    </div>
  );
}
