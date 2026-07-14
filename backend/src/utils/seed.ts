import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import User from '../models/User';
import Setting from '../models/Setting';
import FAQ from '../models/FAQ';

const seedData = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@alqudsinstitute.org' });
    if (!existingAdmin) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@alqudsinstitute.org',
        password: 'Admin@123456',
        role: 'super_admin',
        isActive: true,
      });
      console.log('Super admin created: admin@alqudsinstitute.org / Admin@123456');
    }

    const settings = [
      { key: 'site_name', value: { en: 'Jerusalem Institute for Political and Legal Relations', ar: 'معهد القدس للعلاقات السياسية والقانونية', tr: 'Kudüs Siyasi ve Hukuki İlişkiler Enstitüsü' }, type: 'object', group: 'general' },
      { key: 'site_description', value: { en: 'An independent organization specializing in political affairs, legal studies, policy research, strategic analysis, and international relations.', ar: 'منظمة مستقلة متخصصة في الشؤون السياسية والدراسات القانونية وبحوث السياسات والتحليل الاستراتيجي والعلاقات الدولية.', tr: 'Siyasi işler, hukuk çalışmaları, politika araştırması, stratejik analiz ve uluslararası ilişkiler konusunda uzmanlaşmış bağımsız bir kuruluş.' }, type: 'object', group: 'general' },
      { key: 'contact_email', value: 'info@alqudsinstitute.org', type: 'string', group: 'contact' },
      { key: 'contact_phone', value: '+90 (212) 555 0123', type: 'string', group: 'contact' },
      { key: 'contact_address_en', value: 'Istanbul, Turkey', type: 'string', group: 'contact' },
      { key: 'contact_address_ar', value: 'اسطنبول، تركيا', type: 'string', group: 'contact' },
      { key: 'contact_address_tr', value: 'İstanbul, Türkiye', type: 'string', group: 'contact' },
      { key: 'social_facebook', value: 'https://facebook.com/alqudsinstitute', type: 'string', group: 'social' },
      { key: 'social_twitter', value: 'https://twitter.com/alqudsinst', type: 'string', group: 'social' },
      { key: 'social_linkedin', value: 'https://linkedin.com/company/alqudsinstitute', type: 'string', group: 'social' },
      { key: 'social_youtube', value: 'https://youtube.com/@alqudsinstitute', type: 'string', group: 'social' },
    ];

    for (const setting of settings) {
      await Setting.findOneAndUpdate({ key: setting.key }, setting, { upsert: true });
    }
    console.log('Settings seeded');

    const faqs = [
      {
        question: { en: 'What is the Jerusalem Institute?', ar: 'ما هو معهد القدس؟', tr: 'Kudüs Enstitüsü nedir?' },
        answer: { en: 'The Jerusalem Institute for Political and Legal Relations is an independent organization specializing in political affairs, legal studies, policy research, strategic analysis, and international relations.', ar: 'معهد القدس للعلاقات السياسية والقانونية هو منظمة مستقلة متخصصة في الشؤون السياسية والدراسات القانونية وبحوث السياسات والتحليل الاستراتيجي والعلاقات الدولية.', tr: 'Kudüs Siyasi ve Hukuki İlişkiler Enstitüsü, siyasi işler, hukuk çalışmaları, politika araştırması, stratejik analiz ve uluslararası ilişkiler konusunda uzmanlaşmış bağımsız bir kuruluştur.' },
        category: { en: 'General', ar: 'عام', tr: 'Genel' },
        sortOrder: 0,
      },
      {
        question: { en: 'How can I contact the institute?', ar: 'كيف يمكنني التواصل مع المعهد؟', tr: 'Enstitü ile nasıl iletişime geçebilirim?' },
        answer: { en: 'You can reach us through our contact form, email at info@alqudsinstitute.org, or by phone at +90 (212) 555 0123.', ar: 'يمكنك التواصل معنا من خلال نموذج الاتصال أو البريد الإلكتروني info@alqudsinstitute.org أو عبر الهاتف +90 (212) 555 0123.', tr: 'Bize iletişim formumuz, info@alqudsinstitute.org e-posta adresimiz veya +90 (212) 555 0123 numaralı telefondan ulaşabilirsiniz.' },
        category: { en: 'General', ar: 'عام', tr: 'Genel' },
        sortOrder: 1,
      },
      {
        question: { en: 'What services do you offer?', ar: 'ما هي الخدمات التي تقدمونها؟', tr: 'Hangi hizmetleri sunuyorsunuz?' },
        answer: { en: 'We offer political research, legal studies, policy analysis, strategic consulting, international relations advisory, conferences, workshops, training programs, and publications.', ar: 'نقدم بحوثاً سياسية ودراسات قانونية وتحليل سياسات واستشارات استراتيجية واستشارات في العلاقات الدولية ومؤتمرات وورش عمل وبرامج تدريبية ومنشورات.', tr: 'Siyasi araştırma, hukuk çalışmaları, politika analizi, stratejik danışmanlık, uluslararası ilişkiler danışmanlığı, konferanslar, çalıştaylar, eğitim programları ve yayınlar sunuyoruz.' },
        category: { en: 'Services', ar: 'الخدمات', tr: 'Hizmetler' },
        sortOrder: 2,
      },
    ];

    for (const faq of faqs) {
      await FAQ.findOneAndUpdate(
        { 'question.en': faq.question.en },
        { ...faq, isActive: true },
        { upsert: true }
      );
    }
    console.log('FAQs seeded');

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
