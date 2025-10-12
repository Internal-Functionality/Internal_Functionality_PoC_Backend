import { MongoClient, ObjectId } from 'mongodb';
import { Booking, bookingCollection } from '../fixer-activity/models/activity';

const uri = 'mongodb+srv://admin:admin123@cluster-if.mamcwj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-IF';

const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    await seedDatabase();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const getDB = () => {
  return client.db('Internal-Func-BD'); 
};

const seedDatabase = async () => {
  const db = getDB();
  const collection = db.collection<Booking>(bookingCollection);

  const count = await collection.countDocuments();
  if (count === 0) {
    const initialBookings = [
      { date: '2025-09-30T14:00:00Z', status: 'pending' as const, clientName: 'Maria Fernandez', service: 'Revisión general' },
      { date: '2025-09-30T16:00:00Z', status: 'pending' as const, clientName: 'Josue Onofre', service: 'Instalación de software' },
      { date: '2025-09-29T10:00:00Z', status: 'confirmed' as const, clientName: 'Carlos La Fuente', service: 'Mantenimiento preventivo' },
    ];

    await collection.insertMany(initialBookings);
    console.log('Database seeded with initial bookings');
  }
};

export default client;