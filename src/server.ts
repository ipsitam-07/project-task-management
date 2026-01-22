import mongoose from 'mongoose';
import app from './app';
import config from './config/app.config';
import { swaggerDocs } from './swagger';
import { MongoAPIError } from 'mongodb';

const PORT = config.port;
const MONGO_URI = config.mongoURI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server');
    console.error(error);
    process.exit(1);
  }
};

startServer();
