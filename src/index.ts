import Server from './config/server.config';
import { SERVER_PORT, MONGODB_URI } from './config/env.config';
import mongoose from 'mongoose';

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database MongoDB Atlas!");
    
    Server.listen(SERVER_PORT, () => {
      console.info(`Server running on http://localhost:${SERVER_PORT}`);
    });
    
  } catch (error) {
    console.error('Error starting server', error);
  }
}

startServer();