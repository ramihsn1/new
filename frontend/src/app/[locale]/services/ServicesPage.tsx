'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function ServicesPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Our Services' : locale === 'ar' ? 'خدماتنا' : 'Hizmetlerimiz';

  const services = [
    { icon: '🔍', title: locale === 'en' ? 'Political Research' : locale === 'ar' ? 'البحث السياسي' : 'Siyasi Araştırma', desc: locale === 'en' ? 'Comprehensive political analysis, electoral research, governance studies, and political risk assessment.' : locale === 'ar' ? 'تحليل سياسي شامل وأبحاث انتخابية ودراسات الحوكمة.' : 'Kapsamlı siyasi analiz, seçim araştırması ve yönetişim çalışmaları.' },
    { icon: '⚖️', title: locale === 'en' ? 'Legal Studies' : locale === 'ar' ? 'الدراسات القانونية' : 'Hukuk Çalışmaları', desc: locale === 'en' ? 'In-depth legal analysis, comparative law studies, and international legal framework assessment.' : locale === 'ar' ? 'تحليل قانوني متعمق ودراسات القانون المقارن وتقييم الأطر القانونية الدولية.' : 'Kapsamlı hukuki analiz ve karşılaştırmalı hukuk çalışmaları.' },
    { icon: '📊', title: locale === 'en' ? 'Policy Analysis' : locale === 'ar' ? 'تحليل السياسات' : 'Politika Analizi', desc: locale === 'en' ? 'Evidence-based policy analysis, impact assessment, and strategic planning.' : locale === 'ar' ? 'تحليل سياسات قائم على الأدلة وتقييم الأثر.' : 'Kanıta dayalı politika analizi ve etki değerlendirmesi.' },
    { icon: '🤝', title: locale === 'en' ? 'Strategic Consulting' : locale === 'ar' ? 'الاستشارات الاستراتيجية' : 'Stratejik Danışmanlık', desc: locale === 'en' ? 'Strategic advisory for organizational development and crisis management.' : locale === 'ar' ? 'استشارات استراتيجية للتطوير التنظيمي وإدارة الأزمات.' : 'Organizasyonel gelişim için stratejik danışmanlık.' },
    { icon: '🌐', title: locale === 'en' ? 'International Relations' : locale === 'ar' ? 'العلاقات الدولية' : 'Uluslararası İlişkiler', desc: locale === 'en' ? 'Geopolitical assessment, diplomatic advisory, and cross-border cooperation.' : locale === 'ar' ? 'تقييم الجغرافيا السياسية والاستشارات الدبلوماسية.' : 'Jeopolitik değerlendirme ve diplomatik danışmanlık.' },
    { icon: '🏛️', title: locale === 'en' ? 'Conferences' : locale === 'ar' ? 'المؤتمرات' : 'Konferanslar', desc: locale === 'en' ? 'Organization of international conferences, symposiums, and diplomatic meetings.' : locale === 'ar' ? 'تنظيم المؤتمرات الدولية والندوات.' : 'Uluslararası konferans organizasyonu.' },
    { icon: '🎓', title: locale === 'en' ? 'Training Programs' : locale === 'ar' ? 'برامج التدريب' : 'Eğitim Programları', desc: locale === 'en' ? 'Professional training, capacity building, and leadership development.' : locale === 'ar' ? 'تدريب مهني وبناء القدرات.' : 'Profesyonel eğitim ve kapasite geliştirme.' },
    { icon: '📚', title: locale === 'en' ? 'Publications' : locale === 'ar' ? 'المنشورات' : 'Yayınlar', desc: locale === 'en' ? 'Research reports, policy papers, legal studies, and academic articles.' : locale === 'ar' ? 'تقارير بحثية وأوراق سياسات.' : 'Araştırma raporları ve politika belgeleri.' },
    { icon: '💡', title: locale === 'en' ? 'Legal Consulting' : locale === 'ar' ? 'الاستشارات القانونية' : 'Hukuk Danışmanlığı', desc: locale === 'en' ? 'Expert legal consulting on international law and legislative drafting.' : locale === 'ar' ? 'استشارات قانونية متخصصة في القانون الدولي.' : 'Uluslararası hukuk danışmanlığı.' },
  ];

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1>
        </div>
      </section>
      <section className="pad">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-8 group hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-bold text-primary dark:text-white mb-3">{service.title}</h3>
                <p className="text-sm text-primary dark:text-white/95 leading-relaxed mb-4">{service.desc}</p>
                <Link href={`/${locale}/contact`} className="text-sm font-medium text-secondary hover:text-secondary-light transition-colors">Learn More →</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
