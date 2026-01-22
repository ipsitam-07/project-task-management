import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import authConfig from '../config/auth.config';
import jwt from 'jsonwebtoken';

export const registerUser = async (name: string, email: string, password: string) => {
  //checking if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists with email');
  }

  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  //new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    authConfig.jwt_secret_key,
    {
      expiresIn: authConfig.jwt_token_expiry as any,
    },
  );

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
