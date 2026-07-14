import mongoose, { Schema } from 'mongoose';
import contentBaseSchema from './ContentBase';

const publicationSchema = new Schema(
  {
    ...contentBaseSchema,
    category: {
      type: String,
      enum: ['report', 'policy_paper', 'research', 'article', 'legal_study', 'white_paper'],
      default: 'report',
    },
    pdfFile: { type: String },
    downloadCount: { type: Number, default: 0 },
    thumbnailUrl: { type: String },
    pages: { type: Number },
    language: { type: String, enum: ['en', 'ar', 'tr'], default: 'en' },
  },
  { timestamps: true }
);

publicationSchema.index({ 'category': 1, 'status': 1 });

const Publication = mongoose.model('Publication', publicationSchema);
export default Publication;
