import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logo: string;
  website: string;
  description: Record<string, string>;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const partnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    website: { type: String },
    description: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      tr: { type: String, default: '' },
    },
    category: { type: String, default: 'partner' },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Partner = mongoose.model<IPartner>('Partner', partnerSchema);
export default Partner;
