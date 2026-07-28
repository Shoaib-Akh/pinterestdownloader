'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  DownloadCloud,
  FileText,
  HelpCircle,
  Mail,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { getAuthToken, removeAuthToken } from '@/lib/adminApi';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    if (!isLoginPage) {
      const token = getAuthToken();
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [pathname, isLoginPage, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono">Initializing Admin Portal...</span>
        </div>
      </div>
    );
  }

  // Login page layout without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Download Logs', href: '/admin/downloads', icon: DownloadCloud },
    { label: 'Blog Manager', href: '/admin/blog', icon: FileText },
    { label: 'FAQ Manager', href: '/admin/faq', icon: HelpCircle },
    { label: 'Contact Inbox', href: '/admin/contacts', icon: Mail },
  ];

  const handleLogout = () => {
    removeAuthToken();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-brand-500 selection:text-white">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-slate-700">
            <Image src="/icon.png" alt="PintSave Admin Logo" width={28} height={28} className="w-full h-full object-cover" unoptimized />
          </div>
          <span className="font-bold text-white text-base">PintSave Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col justify-between fixed md:static inset-y-0 left-0 z-40 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-6 space-y-6">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-brand-500/20 shrink-0 border border-slate-700">
                <Image src="/icon.png" alt="PintSave Admin Logo" width={36} height={36} className="w-full h-full object-cover" unoptimized />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-tight leading-none">
                  PintSave
                </h1>
                <span className="text-[10px] font-mono text-brand-400 uppercase font-bold tracking-wider">
                  Admin Console
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            <span className="flex items-center gap-2">Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-slate-950 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
