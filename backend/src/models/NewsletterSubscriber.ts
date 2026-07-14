import mongoose, { Document, Schema } from 'mongoose';
import { INewsletterSubscriber } from '../types/common';

const newsletterSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

const NewsletterSubscriber = mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', newsletterSchema);
export default NewsletterSubscriber;
