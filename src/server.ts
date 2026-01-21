import express, { Request, Response } from 'express';
import config from './config/config';
import mongoose from 'mongoose';

const port = config.port;

const connectURI = config.mongoURI;

mongoose
  .connect(connectURI)
  .then(() => {
    console.log('Mongo DB connected successfully!');
  })
  .catch(() => {
    console.log('DB connection failed');
  });

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});
