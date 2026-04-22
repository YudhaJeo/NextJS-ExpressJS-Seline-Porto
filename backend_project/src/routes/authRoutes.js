// src/routes/authRoutes.js
import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Sesuaikan dengan fungsi yang ada di controller
router.post('/register', register);
router.post('/login', login);

export default router;