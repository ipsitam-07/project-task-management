import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

export function errorHandler(err: Error, req: AuthRequest, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}
