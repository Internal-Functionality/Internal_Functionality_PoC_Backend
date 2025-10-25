//ruta: src/fixer-activity/controllers/activity.controller.ts
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../../config/database.config';
import { Booking, bookingCollection, IBooking } from '../models/activity';
import { start } from 'repl';

export const getFixerActivity = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({})
      .populate({
        path: 'requesterId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'fixerId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'jobId',
        select: 'title',
        model: 'Job'
      })
      .exec();

    const requests = bookings.filter((b) => b.status === 'pending');
    const appointments = bookings.filter((b) => b.status === 'confirmed');
    res.json({
      requests,
      appointments,
    });
  } catch (error) {
    console.error('Error fetching fixer activity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const acceptBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: 'confirmed' },
      { new: true }
    )
      .populate({
        path: 'requesterId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'fixerId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'jobId',
        select: 'title',
        model: 'Job'
      })
      .exec();

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error accepting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    )
      .populate({
        path: 'requesterId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'fixerId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'jobId',
        select: 'title',
        model: 'Job'
      })
      .exec();

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getBookingsByDateRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: 'Los parámetros "startDate" y "endDate" son requeridos (ej: YYYY-MM-DD).',
      });
    }

    // Convertimos a objetos Date nativos de JS
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        message: 'Formato de fecha inválido. Use un formato ISO 8601 (ej: YYYY-MM-DD).',
      });
    }

    // Ejecutar la consulta con Mongoose y populate
    const bookings = await Booking.find({
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate({
        path: 'requesterId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'fixerId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'jobId',
        select: 'title',
        model: 'Job'
      })
      .sort({ date: 1 })
      .exec();

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by date range:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAcceptedBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ status: 'confirmed' })
      .populate({
        path: 'requesterId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'fixerId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'jobId',
        select: 'title',
        model: 'Job'
      })
      .sort({ date: 1 })
      .exec();

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching accepted bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCancelledBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ status: 'cancelled' })
      .populate({
        path: 'requesterId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'fixerId',
        select: 'name',
        model: 'User'
      })
      .populate({
        path: 'jobId',
        select: 'title',
        model: 'Job'
      })
      .sort({ date: 1 })
      .exec();

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching cancelled bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
