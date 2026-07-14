import mongoose, { Schema, Document } from 'mongoose';

export interface IFAQ extends Document {
  question: Record<string, string>;
  answer: Record<string, string>;
  category: Record<string, string>;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    answer: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    category: {
      en: { type: String, default: 'General' },
      ar: { type: String, default: 'عام' },
      tr: { type: String, default: 'Genel' },
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema);
export default FAQ;
