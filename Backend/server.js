import http from 'node:http';
import app from './app.js';
import { ENV_PORT } from './configs/env.config.js';
import { initializeSocket } from './socket.js';

const server = http.createServer(app);

initializeSocket(server);

server.listen(ENV_PORT || 3000, () => {
    console.log(`Server is running on port ${ENV_PORT || 3000}`);
});
