export interface PinterestMediaResult {
  success: boolean;
  type: 'video' | 'image' | 'gif';
  title: string;
  thumbnail: string;
  mediaUrl: string;
  pinId?: string;
  error?: string;
}

export interface UserSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
    plan?: 'FREE' | 'PRO';
  };
}
