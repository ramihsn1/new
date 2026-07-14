import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeading({ label, title, className, centered }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('mb-12', centered && 'text-center', className)}
    >
      {label && (
        <p className="text-[#a89060] text-xs font-semibold uppercase tracking-[0.2em] mb-4">{label}</p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}
