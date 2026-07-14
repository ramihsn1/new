import mongoose, { Schema } from 'mongoose';
import contentBaseSchema from './ContentBase';

const projectSchema = new Schema(
  {
    ...contentBaseSchema,
    objectives: {
      en: { type: String },
      ar: { type: String },
      tr: { type: String },
    },
    results: {
      en: { type: String },
      ar: { type: String },
      tr: { type: String },
    },
    partners: [{ type: Schema.Types.ObjectId, ref: 'Partner' }],
    timeline: [{
      phase: {
        en: { type: String },
        ar: { type: String },
        tr: { type: String },
      },
      description: {
        en: { type: String },
        ar: { type: String },
        tr: { type: String },
      },
      startDate: { type: Date },
      endDate: { type: Date },
      status: { type: String, enum: ['completed', 'in_progress', 'pending'] },
    }],
    gallery: [{ type: String }],
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
