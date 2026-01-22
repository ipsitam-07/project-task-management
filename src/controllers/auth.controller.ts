import { Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { AuthRequest } from '../types';

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const user = await registerUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const data = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
