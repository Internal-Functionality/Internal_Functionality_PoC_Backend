import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI || '3001';
