import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors({ 
    origin: '*', 
    credentials: false 
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

export default app;
