import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGODB_URI } from './config/env.config';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI || '', {});
    console.log('MongoDB connected successfully via Mongoose');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
