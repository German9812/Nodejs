const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const accessToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || 'secret123');
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;