import Server from './config/server.config';
import { SERVER_PORT } from './config/env.config';
import mongoose from 'mongoose';

async function startServer() {
  try {
    await mongoose.connect(
      //"mongodb+srv://admin:admin123@cluster-if.mamcwj7.mongodb.net/Internal-Func-BD?retryWrites=true&w=majority&appName=Cluster-IF"
      //"mongodb+srv://admin:qwerty123@clusterservineo.yotr2ip.mongodb.net/ServineoBD?retryWrites=true&w=majority&appName=ClusterServineo"
      //"mongodb+srv://test123:test321@clusterservineo.yotr2ip.mongodb.net/ServineoBD?retryWrites=true&w=majority&appName=ClusterServineo"
      //"mongodb+srv://loremipsum:FY560KjK7KGsO6BG@clusterservineo.yotr2ip.mongodb.net/ServineoBD?retryWrites=true&w=majority&appName=ClusterServineo"
      "mongodb+srv://sudoers:mOG7495o6IH4Nnjf@clusterservineo.yotr2ip.mongodb.net/ServineoBD?retryWrites=true&w=majority&appName=ClusterServineo"
    );
    
    console.log("Connected to database MongoDB Atlas!");
    
    Server.listen(SERVER_PORT, () => {
      console.info(`Server running on http://localhost:${SERVER_PORT}`);
    });
    
  } catch (error) {
    console.error('Error starting server', error);
  }
}

startServer();