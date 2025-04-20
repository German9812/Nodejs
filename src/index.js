require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const { swaggerUi, specs } = require('./swagger');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto  http://localhost:${PORT}`)
});