import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_DB_URI, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
