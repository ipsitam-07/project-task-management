import jwt, { JwtPayload } from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import { NextFunction, Request, Response } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: string | JwtPayload;
}

const auth = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token. Authorization denied.',
    });
  }
  const token = authHeader?.split('')[1] || '';

  try {
    const decoded = jwt.verify(token, authConfig.jwt_secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Token is not valid',
    });
  }
};

export default auth;
