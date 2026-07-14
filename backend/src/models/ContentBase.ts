import mongoose, { Document, Schema } from 'mongoose';

export interface IContentBase extends Document {
  title: Record<string, string>;
  slug: Record<string, string>;
  content: Record<string, string>;
  excerpt: Record<string, string>;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  author: mongoose.Types.ObjectId;
  publishedAt?: Date;
  metaTitle: Record<string, string>;
  metaDescription: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const contentBaseSchema = {
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    tr: { type: String, required: true },
  },
  slug: {
    en: { type: String, required: true, unique: true },
    ar: { type: String, required: true },
    tr: { type: String, required: true },
  },
  content: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
    tr: { type: String, default: '' },
  },
  excerpt: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
    tr: { type: String, default: '' },
  },
  featuredImage: { type: String },
  images: [{ type: String }],
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  publishedAt: { type: Date },
  metaTitle: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
    tr: { type: String, default: '' },
  },
  metaDescription: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' },
    tr: { type: String, default: '' },
  },
};

export default contentBaseSchema;
