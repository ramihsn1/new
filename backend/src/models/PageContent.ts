import mongoose, { Schema, Document } from 'mongoose';

export interface IPageContent extends Document {
  page: string;
  section: string;
  content: Record<string, any>;
  isActive: boolean;
}

const pageContentSchema = new Schema<IPageContent>(
  {
    page: { type: String, required: true },
    section: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

pageContentSchema.index({ page: 1, section: 1 }, { unique: true });

const PageContent = mongoose.model<IPageContent>('PageContent', pageContentSchema);
export default PageContent;
