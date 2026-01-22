import jwt, { JwtPayload } from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token. Authorization denied.',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token missing',
    });
  }
  try {
    const decoded = jwt.verify(token, authConfig.jwt_secret_key) as JwtPayload;

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    req.user = {
      id: decoded.userId as string,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Token is not valid',
    });
  }
};

export default authMiddleware;
