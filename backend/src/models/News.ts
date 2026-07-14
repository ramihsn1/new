import mongoose, { Schema } from 'mongoose';
import contentBaseSchema from './ContentBase';

const newsSchema = new Schema(
  {
    ...contentBaseSchema,
    category: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    isBreaking: { type: Boolean, default: false },
    readTime: { type: Number },
    gallery: [{ type: String }],
  },
  { timestamps: true }
);

newsSchema.index({ 'status': 1, 'publishedAt': -1 });

const News = mongoose.model('News', newsSchema);
export default News;
