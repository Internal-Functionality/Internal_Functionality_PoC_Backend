import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes';

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL de tu frontend
  }),
);
app.use(express.json());
app.use(AppRoutes);

export default app;
