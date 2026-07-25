'use client';

import { useState, useEffect } from 'react';
import { fetchAdminStats, AdminStats } from '@/lib/adminApi';
import {
  DownloadCloud,
  Eye,
  TrendingUp,
  Mail,
  Globe,
  Film,
  Image as ImageIcon,
  Zap,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchAdminStats();
      setStats(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-800 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="h-28 bg-slate-900 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900 rounded-2xl border border-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-xs text-slate-400">Live platform metrics, traffic stats, and recent media extractions.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Downloads */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Downloads</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
              <DownloadCloud className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {stats.totalDownloads.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14% from last week</span>
          </div>
        </div>

        {/* Today Downloads */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Downloads Today</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {stats.todayDownloads.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Active server processing</div>
        </div>

        {/* Total Page Views */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Page Views</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {stats.totalPageViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">Global web traffic</div>
        </div>

        {/* Unread Contact Messages */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Inbox Messages</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {stats.unreadContacts}
          </div>
          <div className="text-[11px] text-amber-400">Pending user inquiries</div>
        </div>
      </div>

      {/* Middle Grid: Media Types Breakdown + Top Countries */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Media Types Breakdown */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-brand-400" /> Downloads by Media Type
          </h2>
          <div className="space-y-3">
            {stats.topMediaTypes.map((item) => {
              const total = stats.topMediaTypes.reduce((acc, curr) => acc + curr.count, 0);
              const percentage = Math.round((item.count / total) * 100);
              return (
                <div key={item.type} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="capitalize text-slate-300 flex items-center gap-1.5">
                      {item.type === 'video' ? (
                        <Film className="w-3.5 h-3.5 text-brand-400" />
                      ) : item.type === 'image' ? (
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      {item.type}s
                    </span>
                    <span className="text-slate-400 font-mono">
                      {item.count.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.type === 'video'
                          ? 'bg-brand-500'
                          : item.type === 'image'
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Countries */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" /> Top Geographic Regions
          </h2>
          <div className="space-y-3">
            {stats.topCountries.map((c) => (
              <div key={c.country} className="flex items-center justify-between py-1.5 border-b border-slate-800/60 text-xs">
                <span className="font-semibold text-slate-200">{c.country}</span>
                <span className="font-mono text-slate-400">{c.count.toLocaleString()} downloads</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Download Activity Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <DownloadCloud className="w-4 h-4 text-brand-400" /> Recent Download Logs
          </h2>
          <span className="text-xs text-slate-400">Real-time extractions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Quality</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Device</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stats.recentDownloads.map((dl: any, idx: number) => (
                <tr key={dl.id || idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold capitalize text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {dl.mediaType || 'media'}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{dl.quality || 'HD Original'}</td>
                  <td className="py-3 px-4 text-slate-300 font-semibold">{dl.country || 'Global'}</td>
                  <td className="py-3 px-4 text-slate-400">{dl.device || 'Web Browser'}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {new Date(dl.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
