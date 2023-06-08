import type { Request, Response } from 'express';
import { createCategoryService } from '../services/categoryService';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../repositories/types/errors';
import {
  handleOkResp,
  handleErrorResp,
  handleValidationErrorResp,
} from './common';
import { z } from 'zod';

const create = async (req: Request, res: Response) => {
  try {
    const id: string = await createCategoryService(req.body);
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

export default {
  create,
};
