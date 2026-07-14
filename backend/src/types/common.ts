import { Document } from 'mongoose';

export type SupportedLanguage = 'en' | 'ar' | 'tr';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ILocalizedContent {
  en: string;
  ar: string;
  tr: string;
}

export interface ILocalizedRichContent {
  en: string;
  ar: string;
  tr: string;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: T[];
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ITokenPayload {
  id: string;
  role: string;
}

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface INewsletterSubscriber extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt: ILocalizedContent;
  caption: ILocalizedContent;
  folder: string;
  uploadedBy: string;
  createdAt: Date;
}
