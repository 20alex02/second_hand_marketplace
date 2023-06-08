import { loginUser } from '../services/authService';
import type { Request, Response } from 'express';
import {
  getRequiredField,
  handleErrorResp,
  handleOkResp,
  handleValidationErrorResp,
} from './common';
import { WrongPassword } from './errors';
import { z } from 'zod';

// TODO?? create controller and schema to validate
const create = async (req: Request, res: Response, secretKey: string) => {
  try {
    const data = req.body;
    const email: string = getRequiredField(data, 'email');
    const password: string = getRequiredField(data, 'password');
    const bearer = await loginUser(email, password, secretKey as string);
    return handleOkResp(
      201,
      { token: bearer },
      res,
      'Token created successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationErrorResp(error, res);
    }
    if (error instanceof WrongPassword) {
      return handleErrorResp(400, res, error.message);
    }
    return handleErrorResp(500, res, 'Unknown error');
  }
};

export default {
  create,
};
