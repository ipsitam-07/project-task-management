import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  mongoURI: process.env.MONGO_URI as string,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
