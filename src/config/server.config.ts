import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes';

const app = express();
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(AppRoutes);

export default app;
