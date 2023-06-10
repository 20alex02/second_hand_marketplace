import type { Request, Response } from 'express';
import categoryService from '../services/categoryService';
import { handleOkResp, handleError } from './common';

const create = async (req: Request, res: Response, secret?: string) => {
  try {
    const id = await categoryService.create(req.body, req.headers, secret);
    return handleOkResp(
      201,
      { uuid: id },
      res,
      'Category created successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const getOne = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await categoryService.getOne(
      req.params,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { ...result },
      res,
      'Category searched successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await categoryService.getAll();
    return handleOkResp(
      200,
      { ...result },
      res,
      'Category searched successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const update = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await categoryService.update(
      req.params,
      req.query,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { ...result },
      res,
      'Category updated successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteCategory = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await categoryService.delete(
      req.params,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { ...result },
      res,
      'Category deleted successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  create,
  getOne,
  getAll,
  update,
  delete: deleteCategory,
};
