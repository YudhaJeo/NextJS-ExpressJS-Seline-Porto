// src/routes/commentRoutes.js
import express from 'express';
import { getAllComment, createComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET boleh diakses siapa saja (public)
router.get('/', getAllComment);

// POST, PUT, DELETE wajib pakai token
router.post('/', authenticateToken, createComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);

export default router;