import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  mongoURI:
    process.env.MONGO_URI ||
    'mongodb+srv://ipsitamoh07_db_user:XaPnpbNfRYYWz2rd@projectbackend.vl0o2z3.mongodb.net/ProjectBackend?retryWrites=true&w=majority',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
