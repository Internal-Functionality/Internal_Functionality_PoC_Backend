import Server from './config/server.config';

import { SERVER_PORT } from './config/env.config';

async function startServer() {
  try {
    Server.listen(SERVER_PORT, () => {
      console.info(`Server running on http://localhost:${SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
}
//mongodb+srv://admin:admin123@cluster-if.mamcwj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-IF
startServer();
