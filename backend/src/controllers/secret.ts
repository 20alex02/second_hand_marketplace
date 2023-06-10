import { loginUser } from '../services/authService';
import type { Request, Response } from 'express';
import { getRequiredField, handleError, handleOkResp } from './common';

const create = async (req: Request, res: Response, secretKey?: string) => {
  try {
    const data = req.body;
    const email: string = getRequiredField(data, 'email');
    const password: string = getRequiredField(data, 'password');
    const bearer = await loginUser(email, password, secretKey);
    return handleOkResp(
      201,
      { token: bearer },
      res,
      'Token created successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  create,
};
