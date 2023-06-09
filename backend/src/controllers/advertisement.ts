import type { Request, Response } from 'express';
import {
  handleOkResp,
  handleErrorResp,
  handleValidationErrorResp,
} from './common';
import { AdvertisementType } from '@prisma/client';
import { TokenIsNotValid } from '../errors/controllersErrors';
import advertisementService from '../services/advertisementService';
import { z } from 'zod';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../errors/repositoryErrors';

const create = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await advertisementService.create(
      req.body,
      req.headers,
      req.files as Express.Multer.File[],
      secret
    );
    return handleOkResp(201, result, res, 'Advertisement created successfully');
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
    if (error instanceof TokenIsNotValid) {
      return handleErrorResp(401, res, error.message);
    }
    return handleErrorResp(500, res, 'Unknown error');
  }
};

const getTypes = async (_req: Request, res: Response) => {
  return handleOkResp(200, { types: Object.values(AdvertisementType) }, res);
};

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await advertisementService.search(req.query);
    return handleOkResp(
      200,
      result,
      res,
      'Advertisement searched successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationErrorResp(error, res);
    }
    return handleErrorResp(500, res, 'Unknown error');
  }
};

export default {
  create,
  getTypes,
  getAll,
};
