import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  jobId: mongoose.Types.ObjectId;
  requesterId: mongoose.Types.ObjectId;
  fixerId: mongoose.Types.ObjectId;
  date: Date;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending' ;
  createdAt: Date;
  updatedAt: Date;
}
//este esquema define la estructura de los documentos de reserva en la base de datos es distinto de la interfaz IBooking que se utiliza en otras partes del código para tipar objetos de reserva, tipar es decir definir su tipo de datos y estructura en TypeScript, como ser nombre de usuario, fecha, estado etc
const BookingSchema: Schema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fixerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ requester: 1, date: -1 });
BookingSchema.index({ fixer: 1, date: -1 });
BookingSchema.index({ status: 1, date: -1 });

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;


export const bookingCollection = 'bookings';
