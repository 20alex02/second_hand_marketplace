import type { Request, Response } from 'express';
import categoryService from '../services/categoryService';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../errors/repositoryErrors';
import {
  handleOkResp,
  handleErrorResp,
  handleValidationErrorResp,
} from './common';
import { z } from 'zod';

const create = async (req: Request, res: Response) => {
  try {
    const id = await categoryService.create(req.body);
    return handleOkResp(
      201,
      { uuid: id },
      res,
      'Category created successfully'
    );
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
    return handleErrorResp(500, res, 'Unknown error');
  }
};

const getOne = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = categoryService.getOne(req.params, req.headers, secret);
    return handleOkResp(200, result, res, 'Category searched successfully');
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
    return handleErrorResp(500, res, 'Unknown error');
  }
};

export default {
  create,
  getOne,
};
