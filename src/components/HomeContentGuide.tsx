import { CheckCircle2, ShieldCheck, Smartphone, Sparkles, Video, Image as ImageIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function HomeContentGuide() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800 space-y-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand" className="bg-brand-500/20 text-brand-400 border-brand-500/30">
            COMPREHENSIVE PINTEREST MEDIA GUIDE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything You Need to Know About Downloading Pinterest Content
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Pinterest is one of the world's richest visual discovery platforms, filled with millions of inspirational recipe clips, home interior designs, fashion lookbooks, and DIY project guides. However, saving those media assets locally to your phone or desktop in original quality can sometimes feel tricky. Here is how PintSave solves common downloader challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <Video className="w-6 h-6 shrink-0" />
              <h3>Pinterest Video Downloader (MP4 Format)</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              Video pins and idea reels are among the most engaging media types on Pinterest. Unfortunately, the official Pinterest mobile application does not include a direct "Save Video to Phone" button. PintSave extracts the raw 1080p MP4 stream directly from the video host servers, preserving crystal-clear audio and original high bitrates so you can watch your saved clips offline anytime.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Extracts full-length MP4 video files with stereo audio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Supports video pins, idea reels, and animated story pins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Save directly to iOS Camera Roll or Android Gallery</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <ImageIcon className="w-6 h-6 shrink-0" />
              <h3>Original 4K Image Resolution Extraction</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              When you right-click and save images from a web browser grid, Pinterest serves compressed thumbnail preview files (usually 236px, 474px, or 736px wide). PintSave automatically inspects the pin's source payload to locate the uncompressed <code className="bg-stone-900 px-1.5 py-0.5 rounded text-brand-300 font-mono text-xs">/originals/</code> master file, ensuring maximum DPI for printing and moodboards.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bypasses web preview compression down to original source resolution</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Extracts high-resolution JPG, PNG, and WebP format files</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Perfect for digital moodboards, posters, and graphic design</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            Ethical Media Usage & Copyright Etiquette
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed max-w-4xl">
            PintSave is created for personal visual inspiration, offline reference, study, and moodboarding. Always respect content creators, independent artists, and photographers by crediting the original author when referencing saved media publicly. We encourage using downloaded assets responsibly for personal projects and personal backup storage.
          </p>
        </div>
      </div>
    </section>
  );
}
