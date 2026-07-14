import mongoose, { Schema } from 'mongoose';
import contentBaseSchema from './ContentBase';

const serviceSchema = new Schema(
  {
    ...contentBaseSchema,
    icon: { type: String },
    category: {
      en: { type: String },
      ar: { type: String },
      tr: { type: String },
    },
    features: [{
      en: { type: String },
      ar: { type: String },
      tr: { type: String },
    }],
    relatedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
