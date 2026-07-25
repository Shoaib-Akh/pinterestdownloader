'use client';

import { useState, useEffect } from 'react';
import { fetchAdminDownloads, AdminDownloadLog } from '@/lib/adminApi';
import { DownloadCloud, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function AdminDownloadsPage() {
  const [logs, setLogs] = useState<AdminDownloadLog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchAdminDownloads(page, 15);
      if (res.data) setLogs(res.data);
      if (res.pagination) setTotalPages(res.pagination.totalPages);
      setLoading(false);
    }
    load();
  }, [page]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Download Logs</h1>
          <p className="text-xs text-slate-400">Monitor extraction requests, device analytics, and rate compliance.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-50 hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-50 hover:bg-slate-800 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/80 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Pin ID</th>
                <th className="py-3.5 px-4">Format</th>
                <th className="py-3.5 px-4">Resolution</th>
                <th className="py-3.5 px-4">Country</th>
                <th className="py-3.5 px-4">Client Agent</th>
                <th className="py-3.5 px-4">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                    Loading download logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No download logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      #{log.pinId || log.id}
                    </td>
                    <td className="py-3.5 px-4 capitalize font-semibold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          log.mediaType === 'video'
                            ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                            : log.mediaType === 'image'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {log.mediaType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{log.quality}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">{log.country || 'Global'}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] truncate max-w-[150px]">
                      {log.browser || log.device || 'Chrome / Safari'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
