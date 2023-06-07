import type { Request, Response } from 'express';
import { createCategoryService } from '../services/categoryService';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../repositories/types/errors';
import MissingRequiredField from '../exceptions/MissingRequiredField';
import type { ApiResponse } from './types';
import {
  createErrorResponse,
  getRequiredField,
  getOptionalField,
  handleMissingField,
} from './common';

export const actionCreateCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const name: string = getRequiredField(data, 'name');
    const parentId: string | null = getOptionalField(data, 'parentId');
    const id: string = await createCategoryService(name, parentId);
    const response: ApiResponse<object> = {
      status: 'success',
      data: {
        uuid: id,
      },
      message: 'Category created successfully',
    };
    return res.status(201).send(response);
  } catch (error) {
    if (error instanceof MissingRequiredField) {
      return res.status(400).send(handleMissingField(error.field));
    }
    if (error instanceof NonexistentRecordError) {
      return res.status(422).send(createErrorResponse(error.message));
    }
    if (error instanceof DeletedRecordError) {
      return res.status(422).send(createErrorResponse(error.message));
    }
    return res.status(500).send(createErrorResponse('Error occurred'));
  }
};
