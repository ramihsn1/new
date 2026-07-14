'use client';

import { motion } from 'framer-motion';
import { Locale } from '@/lib/config';

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  en: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', body: 'By accessing and using the Al Quds Institute website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
      { heading: 'Use of Content', body: 'All content on this website, including text, images, research, and publications, is protected by copyright. Content may be shared with proper attribution to the Al Quds Institute. Commercial use requires written permission.' },
      { heading: 'User Conduct', body: 'You agree not to use the website for any unlawful purpose or in violation of these terms. You are responsible for maintaining the confidentiality of any account credentials.' },
      { heading: 'Intellectual Property', body: 'The Al Quds Institute name, logo, and all related trademarks are the property of the Jerusalem Institute for Political and Legal Relations. All rights reserved.' },
      { heading: 'Disclaimer', body: 'Information and materials on this website are provided for general informational purposes only. While we strive for accuracy, we make no warranties about the completeness or reliability of the content.' },
      { heading: 'Limitation of Liability', body: 'The Al Quds Institute shall not be liable for any damages arising from the use or inability to use the materials on this website.' },
      { heading: 'Changes to Terms', body: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the website constitutes acceptance of the updated terms.' },
      { heading: 'Governing Law', body: 'These terms shall be governed by and construed in accordance with applicable international laws and regulations.' },
    ],
  },
  ar: {
    title: 'شروط الخدمة',
    sections: [
      { heading: 'قبول الشروط', body: 'من خلال الوصول إلى موقع معهد القدس واستخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق، يرجى عدم استخدام خدماتنا.' },
      { heading: 'استخدام المحتوى', body: 'جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والبحوث والمنشورات، محمية بحقوق النشر. يمكن مشاركة المحتوى مع الإسناد المناسب لمعهد القدس. يتطلب الاستخدام التجاري إذناً كتابياً.' },
      { heading: 'سلوك المستخدم', body: 'أنت توافق على عدم استخدام الموقع لأي غرض غير قانوني أو انتهاك لهذه الشروط. أنت مسؤول عن الحفاظ على سرية بيانات اعتماد الحساب.' },
      { heading: 'الملكية الفكرية', body: 'اسم معهد القدس وشعاره وجميع العلامات التجارية ذات الصلة هي ملك لمعهد القدس للعلاقات السياسية والقانونية. جميع الحقوق محفوظة.' },
      { heading: 'إخلاء المسؤولية', body: 'يتم توفير المعلومات والمواد على هذا الموقع لأغراض إعلامية عامة فقط. بينما نسعى جاهدين للدقة، لا نقدم أي ضمانات حول اكتمال أو موثوقية المحتوى.' },
      { heading: 'تحديد المسؤولية', body: 'لن يكون معهد القدس مسؤولاً عن أي أضرار ناشئة عن استخدام أو عدم القدرة على استخدام المواد على هذا الموقع.' },
      { heading: 'تغييرات الشروط', body: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستصبح التغييرات سارية فور نشرها. استمرار استخدام الموقع يشكل قبولاً للشروط المحدثة.' },
      { heading: 'القانون الحاكم', body: 'تخضع هذه الشروط وتفسر وفقاً للقوانين واللوائح الدولية المعمول بها.' },
    ],
  },
  tr: {
    title: 'Kullanım Koşulları',
    sections: [
      { heading: 'Koşulların Kabulü', body: 'Al Quds Institute web sitesine erişerek ve kullanarak, bu Kullanım Koşullarına bağlı kalmayı kabul etmiş olursunuz. Kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayın.' },
      { heading: 'İçerik Kullanımı', body: 'Bu web sitesindeki tüm içerik, metin, görseller, araştırmalar ve yayınlar dahil olmak üzere telif hakkıyla korunmaktadır. İçerik, Al Quds Institute\'a uygun atıf yapılarak paylaşılabilir. Ticari kullanım yazılı izin gerektirir.' },
      { heading: 'Kullanıcı Davranışı', body: 'Web sitesini yasadışı amaçlarla veya bu koşullara aykırı olarak kullanmamayı kabul edersiniz. Hesap bilgilerinizin gizliliğini korumaktan siz sorumlusunuz.' },
      { heading: 'Fikri Mülkiyet', body: 'Al Quds Institute adı, logosu ve ilgili tüm ticari markalar, Kudüs Siyasi ve Hukuki İlişkiler Enstitüsü\'nün mülkiyetindedir. Tüm hakları saklıdır.' },
      { heading: 'Sorumluluk Reddi', body: 'Bu web sitesindeki bilgiler ve materyaller yalnızca genel bilgilendirme amaçlıdır. Doğruluk için çaba göstersek de, içeriğin eksiksizliği veya güvenilirliği konusunda garanti vermiyoruz.' },
      { heading: 'Sorumluluk Sınırlaması', body: 'Al Quds Institute, bu web sitesindeki materyallerin kullanımından veya kullanılamamasından kaynaklanan hiçbir zarardan sorumlu tutulamaz.' },
      { heading: 'Koşullarda Değişiklikler', body: 'Bu koşulları istediğimiz zaman değiştirme hakkını saklı tutarız. Değişiklikler yayınlandıktan hemen sonra geçerli olur. Web sitesini kullanmaya devam etmek, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.' },
      { heading: 'Geçerli Hukuk', body: 'Bu koşullar, geçerli uluslararası yasa ve yönetmeliklere uygun olarak yönetilecek ve yorumlanacaktır.' },
    ],
  },
};

export default function TermsPage({ locale }: { locale: Locale }) {
  const data = content[locale] || content.en;

  return (
    <div>
      <section className="hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,62,0.15),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-neutral-400 text-lg">Effective date: July 2026</motion.p>
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
