import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes';

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // origen permitido (tu frontend)
    credentials: true, // permite cookies, headers de autenticación, etc.
  })
);

app.use(express.json());
app.use(AppRoutes);

export default app;
