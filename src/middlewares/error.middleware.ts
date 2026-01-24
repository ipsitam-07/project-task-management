import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { AppError } from '../utils/error';

export function errorHandler(err: Error, _req: AuthRequest, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}
