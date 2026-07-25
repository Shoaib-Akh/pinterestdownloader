const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface AdminStats {
  totalDownloads: number;
  todayDownloads: number;
  weekDownloads: number;
  totalPageViews: number;
  unreadContacts: number;
  totalBlogs: number;
  totalFaqs: number;
  topCountries: Array<{ country: string; count: number }>;
  topMediaTypes: Array<{ type: string; count: number }>;
  recentDownloads: Array<any>;
}

export interface AdminDownloadLog {
  id: string;
  url?: string;
  pinId?: string;
  mediaType: string;
  quality: string;
  country?: string;
  browser?: string;
  device?: string;
  createdAt: string;
}

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminBlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export interface AdminFAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  createdAt?: string;
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('pinflow_admin_token');
  }
  return null;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pinflow_admin_token', token);
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pinflow_admin_token');
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function loginAdmin(email: string, password: string) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.success && data.data?.token) {
      setAuthToken(data.data.token);
      return { success: true, token: data.data.token, user: data.data.user };
    }
    return { success: false, error: data.error || 'Invalid credentials' };
  } catch {
    return { success: false, error: 'Network error. Could not connect to API server.' };
  }
}

export async function fetchAdminStats(): Promise<AdminStats> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.data) return data.data;
  } catch {
    // API error handler
  }
  return {
    totalDownloads: 0,
    todayDownloads: 0,
    weekDownloads: 0,
    totalPageViews: 0,
    unreadContacts: 0,
    totalBlogs: 0,
    totalFaqs: 0,
    topCountries: [],
    topMediaTypes: [],
    recentDownloads: [],
  };
}

export async function fetchAdminDownloads(page = 1, limit = 15) {
  try {
    const res = await fetch(`${API_BASE}/api/admin/downloads?page=${page}&limit=${limit}`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.data) return data;
  } catch {
    // API error handler
  }
  return {
    data: [],
    pagination: { page: 1, limit: 15, total: 0, totalPages: 1 },
  };
}

export async function fetchAdminContacts(): Promise<ContactItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/contacts`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.data) return data.data;
  } catch {
    // API error handler
  }
  return [];
}

export async function markContactRead(id: string, read: boolean) {
  try {
    const res = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ read }),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}

export async function fetchAdminBlogs(): Promise<AdminBlogItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/blog`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.data && Array.isArray(data.data)) return data.data;
  } catch {
    // API error handler
  }
  return [];
}

export async function saveAdminBlog(blog: Partial<AdminBlogItem>) {
  try {
    const isEdit = Boolean(blog.id);
    const url = isEdit ? `${API_BASE}/api/admin/blog/${blog.id}` : `${API_BASE}/api/admin/blog`;
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(blog),
    });
    return await res.json();
  } catch {
    return { success: false, error: 'Network error saving blog.' };
  }
}

export async function deleteAdminBlog(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/admin/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}

export async function fetchAdminFAQs(): Promise<AdminFAQItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/faq`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.data) return data.data;
  } catch {
    // API error handler
  }
  return [];
}

export async function saveAdminFAQ(faq: Partial<AdminFAQItem>) {
  try {
    const isEdit = Boolean(faq.id);
    const url = isEdit ? `${API_BASE}/api/admin/faq/${faq.id}` : `${API_BASE}/api/admin/faq`;
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(faq),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}

export async function deleteAdminFAQ(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/admin/faq/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}
