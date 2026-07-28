import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Compass, Smartphone, Infinity, Users, CloudLightning } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Compass,
      title: 'Master Quality Visual Assets',
      description: 'Download photos in their original pixel dimensions and videos in high-bitrate MP4 formats. Essential for graphic designers, fashion curators, and architects who need crisp visual moodboards without compression artifacts.',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      icon: CloudLightning,
      title: 'Zero Latency & Fast Extraction',
      description: 'Our system instantly processes Pinterest CDN endpoints, skipping slow middleman servers. Your MP4 video or 4K photo download link is ready in less than 1 second, saving you time during creative research.',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    },
    {
      icon: Smartphone,
      title: 'Seamless Mobile & Desktop Compatibility',
      description: 'Whether you are on an iPhone using Safari, an Android phone using Chrome, or a desktop computer, PintSave adapts effortlessly. Files save directly into your Photos app or downloads directory.',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      icon: Infinity,
      title: 'Unlimited Downloads Forever',
      description: 'Save as many pins, video clips, and GIFs as your projects require. We never cap your daily downloads, throttle your speeds, or force you to sign up for paid subscription plans.',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
    },
    {
      icon: Users,
      title: 'Complete Anonymous Privacy',
      description: 'You do not need to share your email address, register an account, or log in with social profiles. Download media privately without tracking cookies or user profile logs.',
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-500/10',
    },
    {
      icon: Download,
      title: 'Carousel & Multi-Media Support',
      description: 'Extract multi-slide carousel pins effortlessly. PintSave identifies each individual image or video slide in a carousel, letting you download specific assets or entire sets in HD.',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    },
  ];

  return (
    <section id="benefits" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <Badge variant="brand">USER BENEFITS</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Supercharge Your <span className="text-brand-500">Creative Workflow</span>
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
          Discover why thousands of visual artists, content creators, interior designers, and everyday Pinterest users rely on PintSave daily.
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
