import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = 'mongodb+srv://admin:admin123@cluster-if.mamcwj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-IF';
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
