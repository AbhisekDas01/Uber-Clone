import http from 'node:http';
import app from './app.js';
import { PORT } from './configs/env.config.js';

const server = http.createServer(app);

server.listen(PORT || 3000 , () => {
    console.log(`Server is running on port ${PORT || 3000}`);
})