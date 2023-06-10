import type { Request, Response } from 'express';
import userService from '../services/userService';
import {
  ConflictingRecordError,
  NonexistentRecordError,
  DeletedRecordError,
} from '../errors/repositoryErrors';
import {
  handleOkResp,
  handleErrorResp,
  handleValidationErrorResp,
} from './common';
import { z } from 'zod';
import { TokenIsNotValid } from '../errors/controllersErrors';

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

const update = async (req: Request, res: Response, secret?: string) => {
  try {
    const id: string = await userService.update(req.headers, req.query, secret);
    return handleOkResp(200, { uuid: id }, res, 'User updated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationErrorResp(error, res);
    }
    if (error instanceof NonexistentRecordError) {
      return handleErrorResp(422, res, error.message);
    }
    if (error instanceof DeletedRecordError) {
      return handleErrorResp(422, res, error.message);
    }
    if (error instanceof ConflictingRecordError) {
      return handleErrorResp(422, res, error.message);
    }
    if (error instanceof TokenIsNotValid) {
      return handleErrorResp(401, res, error.message);
    }
    return handleErrorResp(500, res, 'Unknown error');
  }
};

export default {
  create,
  update,
};
