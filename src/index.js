require('dotenv').config();
const express = require('express');
const http = require('http');
const { initWebSocket } = require('./websocket/websocket');
const app = express();
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
const { swaggerUi, specs } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const server = http.createServer(app);
initWebSocket(server);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto  http://localhost:${PORT}`)
});