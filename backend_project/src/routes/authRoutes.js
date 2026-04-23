// src/routes/authRoutes.js
import express from 'express';
import { login, register, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

// Sesuaikan dengan fungsi yang ada di controller
router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyEmail);

export default router;