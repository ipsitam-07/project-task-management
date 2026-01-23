import express from 'express';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/errorMiddleware';
import projectRoutes from './routes/projects.route';
import taskRoutes from './routes/task.route';
import { swaggerDocs } from './swagger';

const app = express();
app.use(express.json());

swaggerDocs(app);
//routes
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/', taskRoutes);

//error handler
app.use(errorHandler);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

export default app;
