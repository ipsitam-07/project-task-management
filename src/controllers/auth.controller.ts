import { Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { IAuthRequest } from '../types';
import { AppError } from '../utils/error';

export const register = async (req: IAuthRequest, res: Response) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    throw new AppError('Name, email and password are required', 400);
  }

  const user = await registerUser(name, email, password);

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
  });
};

export const login = async (req: IAuthRequest, res: Response) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const data = await loginUser(email, password);

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data,
  });
};
