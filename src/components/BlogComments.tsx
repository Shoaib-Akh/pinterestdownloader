'use client';

import React, { useState, useEffect } from 'react';
import { getComments, addComment, BlogComment } from '@/lib/api';
import { MessageSquare, Send, User, Mail, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface BlogCommentsProps {
  blogSlug: string;
  blogId: string;
}

// Helper to generate initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Colors list for avatars
const AVATAR_GRADIENTS = [
  'from-rose-500 to-orange-500',
  'from-pink-500 to-rose-500',
  'from-brand-500 to-pink-600',
  'from-violet-600 to-indigo-600',
  'from-blue-600 to-cyan-500',
  'from-emerald-500 to-teal-600',
];

const getAvatarGradient = (name: string) => {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return AVATAR_GRADIENTS[sum % AVATAR_GRADIENTS.length];
};

export default function BlogComments({ blogSlug, blogId }: BlogCommentsProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadComments() {
      try {
        const fetched = await getComments(blogSlug);
        setComments(fetched);
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [blogSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim() || !email.trim() || !content.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await addComment(blogSlug, {
        name: name.trim(),
        email: email.trim(),
        content: content.trim(),
      });

      if (response.success && response.data) {
        setComments((prev) => [response.data!, ...prev]);
        setContent('');
        setSuccess(true);
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.error || 'Failed to post comment. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8 pt-10 border-t border-stone-200 dark:border-stone-800">
      {/* Title */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-brand-50 dark:bg-brand-500/10 text-brand-500 rounded-xl">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
          Discussion ({comments.length})
        </h3>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Comment Form */}
        <div className="md:col-span-2 bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-850 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
          <div>
            <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm">Join the Conversation</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Share your feedback or questions below. Your email address will not be published.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-xs border border-red-200 dark:border-red-500/20">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs border border-emerald-200 dark:border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Comment posted successfully! Thank you for sharing.</span>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="comment-name" className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="comment-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl py-2 pl-10 pr-4 text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="comment-email" className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="comment-email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl py-2 pl-10 pr-4 text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="comment-content" className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                Comment
              </label>
              <textarea
                id="comment-content"
                rows={4}
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl py-2.5 px-4 text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold rounded-xl text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 group hover:shadow-md cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Submit Comment
                </>
              )}
            </button>
          </form>
        </div>

        {/* Comments List */}
        <div className="md:col-span-3 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-stone-500 dark:text-stone-400 space-y-2">
              <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
              <span className="text-sm font-semibold">Loading comments...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-stone-200 dark:border-stone-855 rounded-2xl text-center">
              <MessageSquare className="w-10 h-10 text-stone-450 dark:text-stone-600 mb-2" />
              <h5 className="font-bold text-stone-700 dark:text-stone-300 text-sm">No comments yet</h5>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1">
                Be the first to share your thoughts on this tutorial! Fill out the form on the left.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-4.5 rounded-2xl shadow-sm flex gap-4 transition-all hover:border-stone-300 dark:hover:border-stone-800"
                >
                  {/* User Initial Circle */}
                  <div
                    className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${getAvatarGradient(
                      comment.name
                    )}`}
                  >
                    {getInitials(comment.name)}
                  </div>

                  <div className="space-y-1.5 flex-grow">
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-bold text-stone-800 dark:text-stone-250 text-sm leading-none">
                        {comment.name}
                      </span>
                      <time className="text-[11px] text-stone-500 dark:text-stone-400 leading-none">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>

                    <p className="text-stone-650 dark:text-stone-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
