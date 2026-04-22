// D:\Personal App\Seline Porto NextJS ExpressJS\backend_project\src\app.js
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors({ 
    origin: '*', 
    credentials: false 
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);

export default app;
