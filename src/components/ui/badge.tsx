import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'secondary' | 'mono' | 'success' | 'outline';
}

export function Badge({ className, variant = 'brand', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors';

  const variants = {
    brand: 'bg-brand-50 dark:bg-brand-500/10 text-brand-500 border border-brand-200 dark:border-brand-500/20',
    secondary: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700',
    mono: 'font-mono text-[11px] uppercase tracking-wider bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900',
    success: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    outline: 'bg-transparent text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
