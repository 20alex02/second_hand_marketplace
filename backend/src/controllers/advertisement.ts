import type { Request, Response } from 'express';
import { handleOkResp, handleError } from './common';
import { AdvertisementType } from '@prisma/client';
import advertisementService from '../services/advertisementService';
import fs from 'fs';

const create = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await advertisementService.create(
      req.body,
      req.headers,
      req.files as Express.Multer.File[],
      secret
    );
    return handleOkResp(
      201,
      { uuid: result },
      res,
      'Advertisement created successfully'
    );
  } catch (error) {
    (req.files as Express.Multer.File[]).forEach(
      (file: Express.Multer.File) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            return;
          }
        });
      }
    );
    return handleError(error as Error, res);
  }
};

const getTypes = async (_req: Request, res: Response) => {
  return handleOkResp(200, { types: Object.values(AdvertisementType) }, res);
};

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await advertisementService.getAll(req.query);
    return handleOkResp(
      200,
      { ...result },
      res,
      'Advertisement searched successfully'
    );
  } catch (error) {
    return handleError(error as Error, res);
  }
};

const adminGetAll = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await advertisementService.adminGetAll(
      req.params,
      req.query,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { ...result },
      res,
      'Advertisement searched successfully'
    );
  } catch (error) {
    return handleError(error as Error, res);
  }
};

const getAllMe = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await advertisementService.getAllMe(
      req.query,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { ...result },
      res,
      'Advertisement searched successfully'
    );
  } catch (error) {
    return handleError(error as Error, res);
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const result = await advertisementService.getOne(req.params);
    return handleOkResp(
      200,
      { ...result },
      res,
      'Advertisement searched successfully'
    );
  } catch (error) {
    return handleError(error as Error, res);
  }
};

const deleteAdvertisement = async (
  req: Request,
  res: Response,
  secret?: string
) => {
  try {
    const result = await advertisementService.delete(
      req.params,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { uuid: result },
      res,
      'Advertisement deleted successfully'
    );
  } catch (error) {
    return handleError(error as Error, res);
  }
};

const update = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await advertisementService.update(
      req.body,
      req.params,
      req.files as Express.Multer.File[],
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { uuid: result },
      res,
      'Advertisement updated successfully'
    );
  } catch (error) {
    (req.files as Express.Multer.File[]).forEach(
      (file: Express.Multer.File) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            return;
          }
        });
      }
    );
    return handleError(error as Error, res);
  }
};

export default {
  create,
  getTypes,
  getAll,
  adminGetAll,
  getAllMe,
  getOne,
  delete: deleteAdvertisement,
  update,
};
