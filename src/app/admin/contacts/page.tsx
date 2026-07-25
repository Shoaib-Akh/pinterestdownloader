'use client';

import { useState, useEffect } from 'react';
import { fetchAdminContacts, markContactRead, ContactItem } from '@/lib/adminApi';
import { Mail, CheckCircle2, Circle, MailOpen, User, Calendar } from 'lucide-react';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    setLoading(true);
    const data = await fetchAdminContacts();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const toggleRead = async (id: string, currentRead: boolean) => {
    await markContactRead(id, !currentRead);
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: !currentRead } : msg))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Contact Inbox</h1>
        <p className="text-xs text-slate-400">User feedback, support requests, and DMCA inquiries.</p>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-slate-900 border border-slate-800 p-12 text-center text-slate-500 font-mono text-xs rounded-2xl">
            Loading inbox messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-12 text-center text-slate-500 rounded-2xl">
            No contact messages in inbox.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                msg.read
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-slate-900 border-brand-500/40 text-white shadow-lg shadow-brand-500/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      msg.read ? 'bg-slate-800 text-slate-400' : 'bg-brand-500 text-white'
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      {msg.name}
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-[10px] uppercase font-mono font-semibold">
                          NEW
                        </span>
                      )}
                    </h3>
                    <a href={`mailto:${msg.email}`} className="text-xs text-slate-400 font-mono hover:text-brand-400">
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  <button
                    onClick={() => toggleRead(msg.id, msg.read)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      msg.read
                        ? 'bg-slate-800 text-slate-400 hover:text-white'
                        : 'bg-brand-500/20 text-brand-400 hover:bg-brand-500/30'
                    }`}
                  >
                    {msg.read ? <CheckCircle2 className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                    <span>{msg.read ? 'Mark Unread' : 'Mark Read'}</span>
                  </button>
                </div>
              </div>

              <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-line pl-11">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
