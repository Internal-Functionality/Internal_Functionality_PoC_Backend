//ruta: src/fixer-activity/controllers/activity.controller.ts
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../../config/database.config';
import { Booking, bookingCollection } from '../models/activity';

export const getFixerActivity = async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const bookings = await db.collection<Booking>(bookingCollection).find({}).toArray();

    const requests = bookings.filter(b => b.status === 'pending');
    const appointments = bookings.filter(b => b.status === 'confirmed');

    res.json({
      requests,
      appointments
    });
  } catch (error) {
    console.error('Error fetching fixer activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const acceptBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const result = await db.collection<Booking>(bookingCollection).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'confirmed' } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updatedBooking = await db.collection<Booking>(bookingCollection).findOne({ _id: new ObjectId(id) });
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const result = await db.collection<Booking>(bookingCollection).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'cancelled' } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updatedBooking = await db.collection<Booking>(bookingCollection).findOne({ _id: new ObjectId(id) });
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};