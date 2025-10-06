import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(AppRoutes);

export default app;
