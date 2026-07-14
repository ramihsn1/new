import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: any;
  group: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
}

const settingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    group: { type: String, default: 'general' },
    type: { type: String, enum: ['string', 'number', 'boolean', 'object', 'array'], default: 'string' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const Setting = mongoose.model<ISetting>('Setting', settingSchema);
export default Setting;
