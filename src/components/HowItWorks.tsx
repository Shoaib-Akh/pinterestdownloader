import { Copy, Sparkles, Download } from 'lucide-react';
import { Card } from './ui/card';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Copy,
      title: 'Copy the Pinterest Pin Link',
      description: 'Open the Pinterest mobile app or browse pinterest.com in your web browser. Find the video pin, photo, carousel, or GIF you want to download. Tap the Share icon (or the three dots menu on desktop) and select "Copy Link".',
    },
    {
      step: '02',
      icon: Sparkles,
      title: 'Paste URL into PintSave',
      description: 'Paste your copied link into the search bar at the top of PintSave. Our system instantly parses the URL, resolves the direct source media link from Pinterest CDN servers, and prepares your file for uncompressed download.',
    },
    {
      step: '03',
      icon: Download,
      title: 'Save Original HD File',
      description: 'Click "Download HD" to save the master high-bitrate MP4 video, original 4K photo, or animated GIF directly to your iPhone Camera Roll, Android Downloads folder, or desktop computer.',
    },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          How to Download Pinterest Media in <span className="text-brand-500">3 Simple Steps</span>
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
          No mandatory accounts, software installation, or tricky browser extensions. Straightforward and instant.
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
