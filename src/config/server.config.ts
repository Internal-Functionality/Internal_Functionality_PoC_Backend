import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001'
];

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(AppRoutes);

export default app;
