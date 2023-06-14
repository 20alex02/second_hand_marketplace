import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { handleErrorResp } from '../controllers/common';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const secretKey = process.env['SECRET_KEY'];

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return handleErrorResp(401, res, 'Unauthorized');

  jwt.verify(token, secretKey as string, (err) => {
    if (err) return handleErrorResp(403, res, 'Forbidden');

    next();
    return;
  });
  return;
};

export default authenticateToken;
