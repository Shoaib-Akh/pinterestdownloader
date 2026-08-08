'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminBlogs, saveAdminBlog, AdminBlogItem } from '@/lib/adminApi';
import { ArrowLeft, Save, Upload, Code, Eye, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<AdminBlogItem>>({
    id: params.id,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    published: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const blogs = await fetchAdminBlogs();
      const match = blogs.find((b) => b.id === params.id);
      if (match) {
        setFormData(match);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const htmlText = event.target?.result as string;
      if (!htmlText) return;

      let extractedTitle = '';
      let extractedExcerpt = '';

      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const titleTag = doc.querySelector('title')?.textContent || doc.querySelector('h1')?.textContent;
        if (titleTag) extractedTitle = titleTag.trim();

        const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                          doc.querySelector('p')?.textContent;
        if (metaDesc) extractedExcerpt = metaDesc.trim().slice(0, 200);
      } catch (err) {
        console.error('HTML parsing error:', err);
      }

      const fileNameSlug = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

      setFormData((prev) => ({
        ...prev,
        title: extractedTitle || prev.title || file.name.replace(/\.[^/.]+$/, ''),
        slug: prev.slug || fileNameSlug,
        excerpt: extractedExcerpt || prev.excerpt,
        content: htmlText,
      }));
      setUploadedFileName(file.name);
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content) return;

    const title = formData.title || formData.slug || 'Untitled Article';
    const slug = formData.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;

    const payload = {
      ...formData,
      title,
      slug,
    };

    setSaving(true);
    await saveAdminBlog(payload);
    setSaving(false);
    router.push('/admin/blog');
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-mono text-xs">
        Loading article data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog Manager
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Edit Article</h1>
          <p className="text-xs text-slate-400">Update URL slug or upload updated HTML content.</p>
        </div>

        {/* Upload HTML File Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".html,.htm,.txt"
            className="hidden"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white"
          >
            <Upload className="w-4 h-4 text-brand-500" />
            Upload .html File
          </Button>
        </div>
      </div>

      {uploadedFileName && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          Successfully loaded HTML file: <span className="font-mono font-bold text-white">{uploadedFileName}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
        <div className="space-y-4">
          {/* URL Slug Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              URL Slug <span className="text-brand-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Article Content with Code Editor / Live HTML Preview Tabs */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Article Content (HTML / CSS) <span className="text-brand-500">*</span>
              </label>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'editor'
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" /> Code Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'preview'
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Live HTML Preview
                </button>
              </div>
            </div>

            {activeTab === 'editor' ? (
              <textarea
                rows={16}
                required
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
              />
            ) : (
              <div className="w-full min-h-[350px] p-6 rounded-xl bg-white text-stone-900 border border-slate-700 overflow-y-auto max-h-[600px]">
                {formData.content ? (
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                ) : (
                  <p className="text-stone-400 italic text-xs">No content to preview yet. Upload an HTML file or write code in the editor.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="edit-published"
              checked={formData.published || false}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-brand-500 focus:ring-brand-500"
            />
            <label htmlFor="edit-published" className="text-xs font-bold text-slate-300 cursor-pointer">
              Published on live blog
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Link href="/admin/blog">
            <Button type="button" variant="secondary" size="sm">
              Cancel
            </Button>
          </Link>
          <Button type="submit" size="sm" disabled={saving} className="gap-2">
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
