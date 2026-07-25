'use client';

import { useState, useEffect } from 'react';
import { fetchAdminFAQs, saveAdminFAQ, deleteAdminFAQ, AdminFAQItem } from '@/lib/adminApi';
import { HelpCircle, Plus, Edit, Trash2, CheckCircle2, XCircle, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<AdminFAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<Partial<AdminFAQItem> | null>(null);

  const loadFaqs = async () => {
    setLoading(true);
    const data = await fetchAdminFAQs();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) return;

    await saveAdminFAQ(editingFaq);
    setEditingFaq(null);
    loadFaqs();
  };

  const handleDelete = async (id: string, question: string) => {
    if (confirm(`Delete FAQ: "${question}"?`)) {
      await deleteAdminFAQ(id);
      loadFaqs();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">FAQ Manager</h1>
          <p className="text-xs text-slate-400">Add, edit, reorder, or unpublish homepage FAQ entries.</p>
        </div>

        <Button
          size="sm"
          className="gap-2"
          onClick={() => setEditingFaq({ question: '', answer: '', order: faqs.length + 1, published: true })}
        >
          <Plus className="w-4 h-4" /> Add FAQ Item
        </Button>
      </div>

      {/* Edit / Create Form Modal Card */}
      {editingFaq && (
        <form onSubmit={handleSave} className="bg-slate-900 border border-brand-500/40 p-6 rounded-2xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-400" />
              {editingFaq.id ? 'Edit FAQ Item' : 'New FAQ Item'}
            </h3>
            <button type="button" onClick={() => setEditingFaq(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Question</label>
              <input
                type="text"
                required
                value={editingFaq.question || ''}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                placeholder="e.g. Is PinFlow 100% free?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Answer</label>
              <textarea
                rows={3}
                required
                value={editingFaq.answer || ''}
                onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                placeholder="Clear answer text explaining how the feature works..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Order</label>
                <input
                  type="number"
                  value={editingFaq.order || 1}
                  onChange={(e) => setEditingFaq({ ...editingFaq, order: parseInt(e.target.value, 10) || 1 })}
                  className="w-20 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono text-center"
                />
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="faq-published"
                  checked={editingFaq.published !== false}
                  onChange={(e) => setEditingFaq({ ...editingFaq, published: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-brand-500"
                />
                <label htmlFor="faq-published" className="text-xs font-bold text-slate-300 cursor-pointer">
                  Published on FAQ section
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" size="sm" onClick={() => setEditingFaq(null)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="gap-1.5">
              <Save className="w-3.5 h-3.5" /> Save FAQ
            </Button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/80 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Question</th>
                <th className="py-3.5 px-4">Answer</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-mono">
                    Loading FAQs...
                  </td>
                </tr>
              ) : faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No FAQs found.
                  </td>
                </tr>
              ) : (
                faqs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-400">
                      {item.order}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white max-w-xs">
                      {item.question}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-md truncate">
                      {item.answer}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditingFaq(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-400 hover:bg-slate-800 transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.question)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
