export type Locale = 'en' | 'ar' | 'tr';

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    publications: string;
    news: string;
    events: string;
    projects: string;
    team: string;
    partners: string;
    media: string;
    faq: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCta1: string;
    heroCta2: string;
    statsTitle: string;
    statsPublications: string;
    statsEvents: string;
    statsProjects: string;
    statsExperts: string;
    aboutPreview: string;
    servicesOverview: string;
    latestNews: string;
    upcomingEvents: string;
    featuredPublications: string;
    featuredProjects: string;
    partners: string;
    testimonials: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    readMore: string;
    viewAll: string;
    download: string;
    register: string;
  };
  about: {
    title: string;
    overview: string;
    vision: string;
    mission: string;
    values: string;
    objectives: string;
    goals: string;
    history: string;
    structure: string;
    visionText: string;
    missionText: string;
    valuesList: { title: string; description: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    send: string;
    address: string;
    followUs: string;
    formSuccess: string;
    formError: string;
  };
  common: {
    search: string;
    noResults: string;
    loading: string;
    error: string;
    backToHome: string;
    pageNotFound: string;
    shareOn: string;
    publishedOn: string;
    by: string;
    category: string;
    tags: string;
    relatedPosts: string;
  };
  footer: {
    quickLinks: string;
    services: string;
    contactInfo: string;
    newsletter: string;
    subscribe: string;
    emailPlaceholder: string;
    subscribeSuccess: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}

const en: Translation = {
  nav: {
    home: 'Home', about: 'About Us', services: 'Services', publications: 'Publications',
    news: 'News', events: 'Events', projects: 'Projects', team: 'Team', partners: 'Partners',
    media: 'Media Center', faq: 'FAQ', contact: 'Contact',
  },
  home: {
    heroTitle: 'Jerusalem Institute for Political and Legal Relations',
    heroSubtitle: 'Independent Research, Strategic Analysis, and International Relations for a Better Future',
    heroCta1: 'Explore Our Work',
    heroCta2: 'Contact Us',
    statsTitle: 'Our Impact',
    statsPublications: 'Publications',
    statsEvents: 'Events',
    statsProjects: 'Projects',
    statsExperts: 'Experts',
    aboutPreview: 'About the Institute',
    servicesOverview: 'Our Services',
    latestNews: 'Latest News',
    upcomingEvents: 'Upcoming Events',
    featuredPublications: 'Featured Publications',
    featuredProjects: 'Featured Projects',
    partners: 'Our Partners',
    testimonials: 'Testimonials',
    ctaTitle: 'Ready to Work Together?',
    ctaText: 'Partner with us to drive meaningful change through research, policy analysis, and strategic consulting.',
    ctaButton: 'Get In Touch',
    readMore: 'Read More',
    viewAll: 'View All',
    download: 'Download',
    register: 'Register Now',
  },
  about: {
    title: 'About Us',
    overview: 'Organization Overview',
    vision: 'Our Vision',
    mission: 'Our Mission',
    values: 'Our Values',
    objectives: 'Our Objectives',
    goals: 'Strategic Goals',
    history: 'Our History',
    structure: 'Organizational Structure',
    visionText: 'To be a leading international institute in political and legal research, shaping policies that promote justice, peace, and cooperation worldwide.',
    missionText: 'To provide high-quality research, analysis, and consultancy in political affairs, legal studies, and international relations, serving governments, organizations, and communities.',
    valuesList: [
      { title: 'Integrity', description: 'We uphold the highest standards of honesty and ethical conduct in all our work.' },
      { title: 'Excellence', description: 'We strive for excellence in research methodology, analysis, and service delivery.' },
      { title: 'Objectivity', description: 'We maintain impartiality and evidence-based approaches in our research and recommendations.' },
      { title: 'Innovation', description: 'We embrace innovative methods and forward-thinking approaches to address complex challenges.' },
      { title: 'Collaboration', description: 'We believe in the power of partnerships and collaborative efforts to achieve meaningful impact.' },
    ],
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch with us for inquiries, collaborations, or consultations.',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    message: 'Your Message',
    send: 'Send Message',
    address: 'Our Address',
    followUs: 'Follow Us',
    formSuccess: 'Your message has been sent successfully. We will get back to you soon.',
    formError: 'An error occurred. Please try again.',
  },
  common: {
    search: 'Search...',
    noResults: 'No results found',
    loading: 'Loading...',
    error: 'An error occurred',
    backToHome: 'Back to Home',
    pageNotFound: 'Page Not Found',
    shareOn: 'Share on',
    publishedOn: 'Published on',
    by: 'By',
    category: 'Category',
    tags: 'Tags',
    relatedPosts: 'Related Posts',
  },
  footer: {
    quickLinks: 'Quick Links',
    services: 'Services',
    contactInfo: 'Contact Information',
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Your email address',
    subscribeSuccess: 'Thank you for subscribing!',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
};

const ar: Translation = {
  nav: {
    home: 'الرئيسية', about: 'عن المعهد', services: 'الخدمات', publications: 'المنشورات',
    news: 'الأخبار', events: 'الفعاليات', projects: 'المشاريع', team: 'الفريق', partners: 'الشركاء',
    media: 'المركز الإعلامي', faq: 'الأسئلة الشائعة', contact: 'اتصل بنا',
  },
  home: {
    heroTitle: 'معهد القدس للعلاقات السياسية والقانونية',
    heroSubtitle: 'بحوث مستقلة وتحليل استراتيجي وعلاقات دولية من أجل مستقبل أفضل',
    heroCta1: 'استكشف أعمالنا',
    heroCta2: 'اتصل بنا',
    statsTitle: 'تأثيرنا',
    statsPublications: 'منشور',
    statsEvents: 'فعالية',
    statsProjects: 'مشروع',
    statsExperts: 'خبير',
    aboutPreview: 'عن المعهد',
    servicesOverview: 'خدماتنا',
    latestNews: 'آخر الأخبار',
    upcomingEvents: 'الفعاليات القادمة',
    featuredPublications: 'منشورات مميزة',
    featuredProjects: 'مشاريع مميزة',
    partners: 'شركاؤنا',
    testimonials: 'آراء الشركاء',
    ctaTitle: 'هل أنت مستعد للعمل معاً؟',
    ctaText: 'شارك معنا لإحداث تغيير هادف من خلال البحث وتحليل السياسات والاستشارات الاستراتيجية.',
    ctaButton: 'تواصل معنا',
    readMore: 'اقرأ المزيد',
    viewAll: 'عرض الكل',
    download: 'تحميل',
    register: 'سجل الآن',
  },
  about: {
    title: 'عن المعهد',
    overview: 'نظرة عامة',
    vision: 'رؤيتنا',
    mission: 'مهمتنا',
    values: 'قيمنا',
    objectives: 'أهدافنا',
    goals: 'الأهداف الاستراتيجية',
    history: 'تاريخنا',
    structure: 'الهيكل التنظيمي',
    visionText: 'أن نكون معهداً دولياً رائداً في البحث السياسي والقانوني، نصنع سياسات تعزز العدالة والسلام والتعاون في جميع أنحاء العالم.',
    missionText: 'تقديم بحوث وتحليلات واستشارات عالية الجودة في الشؤون السياسية والدراسات القانونية والعلاقات الدولية، لخدمة الحكومات والمنظمات والمجتمعات.',
    valuesList: [
      { title: 'النزاهة', description: 'نلتزم بأعلى معايير الصدق والسلوك الأخلاقي في جميع أعمالنا.' },
      { title: 'التميز', description: 'نسعى للتميز في منهجية البحث والتحليل وتقديم الخدمات.' },
      { title: 'الموضوعية', description: 'نحافظ على الحياد والنهج القائم على الأدلة في أبحاثنا وتوصياتنا.' },
      { title: 'الابتكار', description: 'نتبنى الأساليب المبتكرة والتفكير المستقبلي لمواجهة التحديات المعقدة.' },
      { title: 'التعاون', description: 'نؤمن بقوة الشراكات والجهود التعاونية لتحقيق تأثير هادف.' },
    ],
  },
  contact: {
    title: 'اتصل بنا',
    subtitle: 'تواصل معنا للاستفسارات أو التعاون أو الاستشارات.',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    subject: 'الموضوع',
    message: 'رسالتك',
    send: 'إرسال الرسالة',
    address: 'عنواننا',
    followUs: 'تابعنا',
    formSuccess: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
    formError: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
  },
  common: {
    search: 'بحث...',
    noResults: 'لا توجد نتائج',
    loading: 'جار التحميل...',
    error: 'حدث خطأ',
    backToHome: 'العودة للرئيسية',
    pageNotFound: 'الصفحة غير موجودة',
    shareOn: 'مشاركة عبر',
    publishedOn: 'نشر في',
    by: 'بواسطة',
    category: 'التصنيف',
    tags: 'الوسوم',
    relatedPosts: 'مواضيع ذات صلة',
  },
  footer: {
    quickLinks: 'روابط سريعة',
    services: 'خدماتنا',
    contactInfo: 'معلومات الاتصال',
    newsletter: 'النشرة البريدية',
    subscribe: 'اشتراك',
    emailPlaceholder: 'بريدك الإلكتروني',
    subscribeSuccess: 'شكراً لاشتراكك!',
    rights: 'جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
  },
};

const tr: Translation = {
  nav: {
    home: 'Ana Sayfa', about: 'Hakkımızda', services: 'Hizmetler', publications: 'Yayınlar',
    news: 'Haberler', events: 'Etkinlikler', projects: 'Projeler', team: 'Ekibimiz', partners: 'Ortaklar',
    media: 'Medya Merkezi', faq: 'SSS', contact: 'İletişim',
  },
  home: {
    heroTitle: 'Kudüs Siyasi ve Hukuki İlişkiler Enstitüsü',
    heroSubtitle: 'Daha İyi Bir Gelecek İçin Bağımsız Araştırma, Stratejik Analiz ve Uluslararası İlişkiler',
    heroCta1: 'Çalışmalarımızı Keşfedin',
    heroCta2: 'Bize Ulaşın',
    statsTitle: 'Etkimiz',
    statsPublications: 'Yayın',
    statsEvents: 'Etkinlik',
    statsProjects: 'Proje',
    statsExperts: 'Uzman',
    aboutPreview: 'Enstitü Hakkında',
    servicesOverview: 'Hizmetlerimiz',
    latestNews: 'Son Haberler',
    upcomingEvents: 'Yaklaşan Etkinlikler',
    featuredPublications: 'Öne Çıkan Yayınlar',
    featuredProjects: 'Öne Çıkan Projeler',
    partners: 'Ortaklarımız',
    testimonials: 'Referanslar',
    ctaTitle: 'Birlikte Çalışmaya Hazır mısınız?',
    ctaText: 'Araştırma, politika analizi ve stratejik danışmanlık yoluyla anlamlı değişim sağlamak için bizimle ortak olun.',
    ctaButton: 'İletişime Geçin',
    readMore: 'Devamını Oku',
    viewAll: 'Tümünü Gör',
    download: 'İndir',
    register: 'Kayıt Ol',
  },
  about: {
    title: 'Hakkımızda',
    overview: 'Kurum Genel Bakış',
    vision: 'Vizyonumuz',
    mission: 'Misyonumuz',
    values: 'Değerlerimiz',
    objectives: 'Hedeflerimiz',
    goals: 'Stratejik Hedefler',
    history: 'Tarihçemiz',
    structure: 'Organizasyon Yapısı',
    visionText: 'Adalet, barış ve dünya çapında işbirliğini teşvik eden politikaları şekillendiren, siyasi ve hukuki araştırmada lider bir uluslararası enstitü olmak.',
    missionText: 'Hükümetlere, kuruluşlara ve topluluklara hizmet ederek siyasi işler, hukuk çalışmaları ve uluslararası ilişkiler alanında yüksek kaliteli araştırma, analiz ve danışmanlık sağlamak.',
    valuesList: [
      { title: 'Dürüstlük', description: 'Tüm çalışmalarımızda en yüksek dürüstlük ve etik davranış standartlarını koruruz.' },
      { title: 'Mükemmellik', description: 'Araştırma metodolojisi, analiz ve hizmet sunumunda mükemmellik için çaba gösteririz.' },
      { title: 'Tarafsızlık', description: 'Araştırma ve önerilerimizde tarafsızlığı ve kanıta dayalı yaklaşımları sürdürürüz.' },
      { title: 'Yenilikçilik', description: 'Karmaşık zorlukları ele almak için yenilikçi yöntemleri ve ileriye dönük yaklaşımları benimseriz.' },
      { title: 'İşbirliği', description: 'Anlamlı etki elde etmek için ortaklıkların ve işbirlikçi çabaların gücüne inanırız.' },
    ],
  },
  contact: {
    title: 'Bize Ulaşın',
    subtitle: 'Sorularınız, işbirlikleri veya danışmanlık için bizimle iletişime geçin.',
    name: 'Ad Soyad',
    email: 'E-posta Adresi',
    phone: 'Telefon Numarası',
    subject: 'Konu',
    message: 'Mesajınız',
    send: 'Mesaj Gönder',
    address: 'Adresimiz',
    followUs: 'Bizi Takip Edin',
    formSuccess: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    formError: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  },
  common: {
    search: 'Ara...',
    noResults: 'Sonuç bulunamadı',
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',
    backToHome: 'Ana Sayfaya Dön',
    pageNotFound: 'Sayfa Bulunamadı',
    shareOn: 'Paylaş',
    publishedOn: 'Yayınlanma Tarihi',
    by: 'Yazar',
    category: 'Kategori',
    tags: 'Etiketler',
    relatedPosts: 'İlgili Yazılar',
  },
  footer: {
    quickLinks: 'Hızlı Bağlantılar',
    services: 'Hizmetler',
    contactInfo: 'İletişim Bilgileri',
    newsletter: 'Bülten',
    subscribe: 'Abone Ol',
    emailPlaceholder: 'E-posta adresiniz',
    subscribeSuccess: 'Abone olduğunuz için teşekkürler!',
    rights: 'Tüm hakları saklıdır.',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
  },
};

export const translations: Record<Locale, Translation> = { en, ar, tr };

export function useTranslation(locale: Locale): Translation {
  return translations[locale] || translations.en;
}
