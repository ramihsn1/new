import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const base = 'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-colors';

const variants = {
  primary: 'bg-white text-black hover:bg-accent hover:text-white',
  secondary: 'bg-accent text-white hover:bg-accent/80',
  outline: 'border border-gray-600 text-white hover:border-white',
  ghost: 'text-gray-900 dark:text-white hover:text-accent',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  href,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], disabled && 'opacity-50 pointer-events-none', className);

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
