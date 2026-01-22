import dotenv from 'dotenv';

dotenv.config();

const authConfig = {
  jwt_secret_key: process.env.JWT_TOKEN as string,
  jwt_token_expiry: process.env.EXPIRES_IN as string,
  refresh_secret_key: process.env.JWT_REFRESH_TOKEN as string,
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
};

export default authConfig;
