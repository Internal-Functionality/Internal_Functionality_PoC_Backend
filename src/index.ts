import Server from './config/server.config';
//
import mongoose from 'mongoose';
import { connectDB } from './serverData';
import { SERVER_PORT } from './config/env.config';

async function startServer() {
  try {
    Server.listen(SERVER_PORT, () => {
      console.info(`Server running on http://localhost:${SERVER_PORT}`);
      connectDB();
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
}

startServer();
