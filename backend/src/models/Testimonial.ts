import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: Record<string, string>;
  position: Record<string, string>;
  organization: Record<string, string>;
  content: Record<string, string>;
  photo?: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    position: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      tr: { type: String, default: '' },
    },
    organization: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      tr: { type: String, default: '' },
    },
    content: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    photo: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
export default Testimonial;
