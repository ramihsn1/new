import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: any;
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin' | 'editor';
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
