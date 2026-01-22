import express from 'express';
import authRoutes from './routes/auth.route';

const app = express();
app.use(express.json());

//routes
app.use('/auth', authRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

export default app;
