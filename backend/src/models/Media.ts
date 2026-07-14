import mongoose, { Schema } from 'mongoose';
import { IMedia } from '../types/common';

const mediaSchema = new Schema<IMedia>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    alt: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      tr: { type: String, default: '' },
    },
    caption: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      tr: { type: String, default: '' },
    },
    folder: { type: String, default: 'general' },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false } as any,
  },
  { timestamps: true }
);

const Media = mongoose.model<IMedia>('Media', mediaSchema);
export default Media;
