'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  en: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information We Collect', body: 'We collect information you provide directly, such as your name, email address, and any messages you submit through our contact forms or newsletter subscription.' },
      { heading: 'How We Use Information', body: 'We use the information we collect to respond to your inquiries, send newsletters and updates (if subscribed), and improve our services and website experience.' },
      { heading: 'Data Protection', body: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.' },
      { heading: 'Cookies', body: 'Our website uses essential cookies for functionality and analytics. You can control cookie preferences through your browser settings.' },
      { heading: 'Third-Party Services', body: 'We may use third-party services for analytics, hosting, and email delivery. These services have their own privacy policies governing the use of your information.' },
      { heading: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data. You may also unsubscribe from our communications at any time.' },
      { heading: 'Contact Us', body: 'If you have questions about this Privacy Policy, please contact us at info@alqudsinstitute.org.' },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    sections: [
      { heading: 'المعلومات التي نجمعها', body: 'نجمع المعلومات التي تقدمها مباشرة، مثل اسمك وبريدك الإلكتروني وأي رسائل ترسلها من خلال نماذج الاتصال أو الاشتراك في النشرة البريدية.' },
      { heading: 'كيفية استخدام المعلومات', body: 'نستخدم المعلومات التي نجمعها للرد على استفساراتك وإرسال النشرات الإخبارية والتحديثات (إذا اشتركت) وتحسين خدماتنا وتجربة الموقع.' },
      { heading: 'حماية البيانات', body: 'نطبق التدابير التقنية والتنظيمية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو الإتلاف.' },
      { heading: 'ملفات تعريف الارتباط', body: 'يستخدم موقعنا ملفات تعريف الارتباط الأساسية للوظائف والتحليلات. يمكنك التحكم في تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح.' },
      { heading: 'خدمات الطرف الثالث', body: 'قد نستخدم خدمات طرف ثالث للتحليلات والاستضافة وتوصيل البريد الإلكتروني. لهذه الخدمات سياسات خصوصية خاصة بها.' },
      { heading: 'حقوقك', body: 'لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. يمكنك أيضاً إلغاء الاشتراك في اتصالاتنا في أي وقت.' },
      { heading: 'اتصل بنا', body: 'إذا كانت لديك أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على info@alqudsinstitute.org.' },
    ],
  },
  tr: {
    title: 'Gizlilik Politikası',
    sections: [
      { heading: 'Topladığımız Bilgiler', body: 'Adınız, e-posta adresiniz ve iletişim formlarımız veya bülten aboneliğimiz aracılığıyla gönderdiğiniz mesajlar gibi doğrudan sağladığınız bilgileri topluyoruz.' },
      { heading: 'Bilgileri Nasıl Kullanıyoruz', body: 'Topladığımız bilgileri sorularınızı yanıtlamak, bülten ve güncellemeler göndermek (aboneyseniz) ve hizmetlerimizi iyileştirmek için kullanıyoruz.' },
      { heading: 'Veri Koruma', body: 'Kişisel verilerinizi yetkisiz erişim, değişiklik, ifşa veya imhaya karşı korumak için uygun teknik ve organizasyonel önlemler uyguluyoruz.' },
      { heading: 'Çerezler', body: 'Web sitemiz, işlevsellik ve analitik için gerekli çerezleri kullanır. Tarayıcı ayarlarınız aracılığıyla çerez tercihlerini kontrol edebilirsiniz.' },
      { heading: 'Üçüncü Taraf Hizmetleri', body: 'Analitik, barındırma ve e-posta teslimi için üçüncü taraf hizmetleri kullanabiliriz. Bu hizmetlerin bilgilerinizin kullanımını yöneten kendi gizlilik politikaları vardır.' },
      { heading: 'Haklarınız', body: 'Kişisel verilerinize erişme, düzeltme veya silme hakkına sahipsiniz. İletişimlerimizden istediğiniz zaman abonelikten çıkabilirsiniz.' },
      { heading: 'Bize Ulaşın', body: 'Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen info@alqudsinstitute.org adresinden bizimle iletişime geçin.' },
    ],
  },
};

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const data = content[locale] || content.en;

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-neutral-400 text-lg">Last updated: July 2026</motion.p>
        </div>
      </section>
      <section className="pad">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {data.sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.heading}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
