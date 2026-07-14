'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale } from '@/lib/config';

export default function FAQPage({ locale }: { locale: Locale }) {
  const title = locale === 'en' ? 'Frequently Asked Questions' : locale === 'ar' ? 'الأسئلة الشائعة' : 'Sıkça Sorulan Sorular';
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: locale === 'en' ? 'What is the Jerusalem Institute?' : locale === 'ar' ? 'ما هو معهد القدس؟' : 'Kudüs Enstitüsü nedir?', a: locale === 'en' ? 'An independent organization specializing in political affairs, legal studies, policy research, strategic analysis, and international relations.' : locale === 'ar' ? 'منظمة مستقلة متخصصة في الشؤون السياسية والدراسات القانونية والعلاقات الدولية.' : 'Siyasi işler, hukuk çalışmaları ve uluslararası ilişkiler konusunda uzmanlaşmış bağımsız bir kuruluş.' },
    { q: locale === 'en' ? 'What services do you offer?' : locale === 'ar' ? 'ما هي الخدمات التي تقدمونها؟' : 'Hangi hizmetleri sunuyorsunuz?', a: locale === 'en' ? 'Political research, legal studies, policy analysis, strategic consulting, conferences, workshops, and publications.' : locale === 'ar' ? 'بحوث سياسية ودراسات قانونية وتحليل سياسات واستشارات ومؤتمرات وورش عمل ومنشورات.' : 'Siyasi araştırma, hukuk çalışmaları, politika analizi, stratejik danışmanlık, konferanslar ve yayınlar.' },
    { q: locale === 'en' ? 'How can I contact the institute?' : locale === 'ar' ? 'كيف يمكنني التواصل؟' : 'Nasıl iletişime geçebilirim?', a: locale === 'en' ? 'Via our contact form, email at info@alqudsinstitute.org, or phone at +90 (212) 555 0123.' : locale === 'ar' ? 'عبر نموذج الاتصال أو البريد الإلكتروني info@alqudsinstitute.org.' : 'İletişim formumuz veya info@alqudsinstitute.org e-posta adresimiz aracılığıyla.' },
    { q: locale === 'en' ? 'Is the institute independent?' : locale === 'ar' ? 'هل المعهد مستقل؟' : 'Enstitü bağımsız mı?', a: locale === 'en' ? 'Yes, the Jerusalem Institute is a fully independent organization.' : locale === 'ar' ? 'نعم، معهد القدس هو منظمة مستقلة تماماً.' : 'Evet, Kudüs Enstitüsü tamamen bağımsız bir kuruluştur.' },
    { q: locale === 'en' ? 'How can I collaborate?' : locale === 'ar' ? 'كيف يمكنني التعاون؟' : 'Nasıl işbirliği yapabilirim?', a: locale === 'en' ? 'Contact us via our form detailing your proposal.' : locale === 'ar' ? 'تواصل معنا عبر نموذج الاتصال مع تفاصيل اقتراحك.' : 'Teklifinizi detaylandırarak iletişim formumuz aracılığıyla bize ulaşın.' },
    { q: locale === 'en' ? 'Do you offer internships?' : locale === 'ar' ? 'هل تقدمون فرص تدريب؟' : 'Staj imkanı sunuyor musunuz?', a: locale === 'en' ? 'Yes, for graduate students and young professionals in relevant fields.' : locale === 'ar' ? 'نعم، لطلاب الدراسات العليا والمهنيين الشباب.' : 'Evet, ilgili alanlarda lisansüstü öğrenciler ve genç profesyoneller için.' },
  ];

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" /><div className="relative max-w-7xl mx-auto px-4 text-center"><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</motion.h1></div></section>
      <section className="pad"><div className="max-w-3xl mx-auto"><div className="space-y-3">{faqs.map((faq, i) => <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card overflow-hidden"><button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left"><span className="font-bold text-primary dark:text-white pr-4">{faq.q}</span><span className={`shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}><svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></span></button><AnimatePresence>{open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6"><p className="text-primary dark:text-white/95 leading-relaxed pt-4 border-t border-primary/5 dark:border-white/5">{faq.a}</p></motion.div>}</AnimatePresence></motion.div>)}</div></div></section>
    </div>
  );
}
