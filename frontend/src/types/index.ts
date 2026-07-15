export interface LocalizedString {
  en: string;
  ar: string;
  tr: string;
}

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: { msg: string; path: string }[];
}

export interface ContentItem {
  _id: string;
  title: LocalizedString;
  slug: LocalizedString;
  content: LocalizedString;
  excerpt: LocalizedString;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  status: ContentStatus;
  author?: string;
  publishedAt?: string;
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem extends ContentItem {
  category?: string;
  isFeatured?: boolean;
}

export interface EventItem extends ContentItem {
  startDate: string;
  endDate?: string;
  location: LocalizedString;
  isVirtual?: boolean;
  registrationUrl?: string;
}

export interface ServiceItem extends ContentItem {
  icon?: string;
  sortOrder?: number;
}

export interface PublicationItem extends ContentItem {
  type?: string;
  fileUrl?: string;
  fileSize?: number;
  isDownloadable?: boolean;
}

export interface ProjectItem extends ContentItem {
  projectStatus?: string;
  startYear?: number;
  endYear?: number;
  client?: string;
}

export interface TeamMember {
  _id: string;
  name: LocalizedString;
  position: LocalizedString;
  bio: LocalizedString;
  photo?: string;
  socialLinks?: { platform: string; url: string }[];
  sortOrder: number;
  isActive: boolean;
}

export interface Partner {
  _id: string;
  name: LocalizedString;
  description?: LocalizedString;
  logo?: string;
  website?: string;
  category?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface FAQItem {
  _id: string;
  question: LocalizedString;
  answer: LocalizedString;
  sortOrder: number;
  isActive: boolean;
}

export interface TestimonialItem {
  _id: string;
  name: LocalizedString;
  position: LocalizedString;
  organization: LocalizedString;
  quote: LocalizedString;
  photo?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  news: { total: number; published: number };
  event: { total: number; published: number };
  service: { total: number; published: number };
  publication: { total: number; published: number };
  project: { total: number; published: number };
  team: { total: number; published: number };
  partner: { total: number; published: number };
  contactmessage: { total: number; published: number };
  newslettersubscriber: { total: number; published: number };
  media: { total: number; published: number };
  unreadMessages: number;
}

export interface Settings {
  [key: string]: any;
}
