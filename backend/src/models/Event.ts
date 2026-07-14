import mongoose, { Schema } from 'mongoose';
import contentBaseSchema from './ContentBase';

const eventSchema = new Schema(
  {
    ...contentBaseSchema,
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
      tr: { type: String, required: true },
    },
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    registrationUrl: { type: String },
    speakers: [{
      name: { type: String, required: true },
      title: { type: String },
      photo: { type: String },
      bio: { type: String },
    }],
    agenda: [{
      time: { type: String },
      title: { type: String },
      description: { type: String },
      speaker: { type: String },
    }],
    eventStatus: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    capacity: { type: Number },
    registeredCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

eventSchema.index({ 'startDate': 1, 'eventStatus': 1 });

const Event = mongoose.model('Event', eventSchema);
export default Event;
