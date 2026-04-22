// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'jess_secret_key_123';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Akses ditolak, token hilang' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token tidak valid atau expired' });
    }
    
    // Simpan data user dari token ke dalam request (req.user)
    req.user = decoded; 
    next();
  });
};