import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: Record<string, string>;
  position: Record<string, string>;
  email: string;
  phone?: string;
  photo: string;
  biography: Record<string, string>;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeamMember>(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    position: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    email: { type: String },
    phone: { type: String },
    photo: { type: String, required: true },
    biography: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
      tr: { type: String, default: '' },
    },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      website: { type: String },
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeamMember>('Team', teamSchema);
export default Team;
