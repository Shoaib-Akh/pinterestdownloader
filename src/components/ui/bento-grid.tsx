import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function BentoGrid({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoCard({ className, colSpan = 1, rowSpan = 1, children, ...props }: BentoCardProps) {
  const colClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
  };

  const rowClasses = {
    1: 'md:row-span-1',
    2: 'md:row-span-2',
  };

  return (
    <div
      className={cn(
        'group relative bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-8 shadow-sm hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300 flex flex-col justify-between overflow-hidden',
        colClasses[colSpan],
        rowClasses[rowSpan],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
