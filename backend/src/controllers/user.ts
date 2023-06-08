import type { Request, Response } from 'express';
import userService from '../services/userService';
import { ConflictingRecordError } from '../repositories/types/errors';
import {
  handleOkResp,
  handleErrorResp,
  handleValidationErrorResp,
} from './common';
import { z } from 'zod';

const create = async (req: Request, res: Response) => {
  try {
    const id: string = await userService.create(req.body);
    return handleOkResp(201, { uuid: id }, res, 'User created successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationErrorResp(error, res);
    }
    if (error instanceof ConflictingRecordError) {
      return handleErrorResp(422, res, error.message);
    }
    return handleErrorResp(500, res, 'Unknown error');
  }
};

export default {
  create,
};
