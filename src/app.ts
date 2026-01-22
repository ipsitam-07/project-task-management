import express from 'express';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/errorMiddleware';
import projectRoutes from './routes/projects.route';

const app = express();
app.use(express.json());
app.use(errorHandler);

//routes
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

export default app;
