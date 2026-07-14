import mongoose, { Document, Schema } from 'mongoose';
import { IContactMessage } from '../types/common';

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    phone: { type: String, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
export default ContactMessage;
