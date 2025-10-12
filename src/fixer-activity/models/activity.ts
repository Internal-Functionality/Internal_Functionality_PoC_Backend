import { ObjectId } from 'mongodb';

export interface Booking {
  _id?: ObjectId;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  clientName: string;
  service: string;
}

export const bookingCollection = 'bookings';
