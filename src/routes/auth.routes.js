const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Usuario de prueba para autenticación
const user = {
  username: 'admin',
  password: bcrypt.hashSync('123456', 8) // contraseña cifrada
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado correctamente
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;
