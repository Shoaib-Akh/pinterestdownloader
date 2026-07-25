export interface CarouselItem {
  url: string;
  type: 'image' | 'video';
}

export interface MediaResult {
  success: boolean;
  pinId?: string;
  title?: string;
  type?: 'image' | 'video' | 'gif' | 'carousel';
  thumbnail?: string;
  mediaUrl?: string;
  items?: CarouselItem[];
  error?: string;
}
