'use client';

import { Copy, Sparkles, Download } from 'lucide-react';
import { Card } from './ui/card';
import { useLanguage } from '@/providers/language-provider';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: Copy,
      title: t('step1_title', 'Copy Pinterest URL'),
      description: t('step1_desc', 'Open Pinterest app or site and copy the link of the pin you want to save.'),
    },
    {
      step: '02',
      icon: Sparkles,
      title: t('step2_title', 'Paste into PintSave'),
      description: t('step2_desc', 'Paste the link into the search field above and click the Download button.'),
    },
    {
      step: '03',
      icon: Download,
      title: t('step3_title', 'Save HD File'),
      description: t('step3_desc', 'Click Download HD to save high quality media to your device storage.'),
    },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('how_title', 'How to Save Pinterest Media')}
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
          {t('how_subtitle', 'Follow these easy steps to download any video, photo, or GIF in seconds.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} hoverEffect className="relative flex flex-col justify-between p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{item.title}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
