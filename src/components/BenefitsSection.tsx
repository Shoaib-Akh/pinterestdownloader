import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Compass, Smartphone, Infinity, Users, CloudLightning } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Compass,
      title: 'High Quality Assets',
      description: 'Download photos in their original master quality and videos in high-bitrate MP4. Perfect for high DPI printing, professional designs, and moodboards.',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      icon: CloudLightning,
      title: 'Lightning Fast Speeds',
      description: 'Our backend resolves Pin resource endpoints and bypasses CDN throttling in under 1 second. No waiting around in queues.',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    },
    {
      icon: Smartphone,
      title: 'Fully Mobile Optimized',
      description: 'Works perfectly on iOS, Android, macOS, and Windows. Save files directly to your device storage or camera roll without any app installation.',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      icon: Infinity,
      title: 'Unlimited Downloads',
      description: 'Save as many pins, videos, and GIFs as you want. There are no daily caps, rate limits, or hidden subscriptions.',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
    },
    {
      icon: Users,
      title: '100% Anonymous',
      description: 'No email address, social login, or personal registration needed. Save the media you love with complete privacy.',
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10',
    },
    {
      icon: Download,
      title: 'Batch & Carousel Support',
      description: 'Extract multiple high-res media files from Pinterest Carousel pins and select which images or video slides to save.',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    },
  ];

  return (
    <section id="benefits" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <Badge variant="brand">BENEFITS</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Supercharge Your <span className="text-brand-500">Creative Workflow</span>
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
          Why creators, curators, and designers use PintSave for reference collection and mood boarding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} hoverEffect className="flex flex-col justify-between p-8 border border-stone-200/60 dark:border-stone-800/80">
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
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
