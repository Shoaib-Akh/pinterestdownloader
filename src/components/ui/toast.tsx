import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border animate-in slide-in-from-bottom-5 duration-200 text-sm font-medium',
        type === 'success' && 'bg-stone-900 text-white border-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200',
        type === 'error' && 'bg-red-500 text-white border-red-600'
      )}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 shrink-0" />
      )}
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-stone-400 hover:text-white dark:hover:text-stone-900"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
