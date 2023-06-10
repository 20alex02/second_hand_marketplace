import type { Request, Response } from 'express';
import userService from '../services/userService';
import { handleOkResp, handleError } from './common';

const create = async (req: Request, res: Response) => {
  try {
    const id: string = await userService.create(req.body);
    return handleOkResp(201, { uuid: id }, res, 'User created successfully');
  } catch (error) {
    return handleError(error, res);
  }
};

const update = async (req: Request, res: Response, secret?: string) => {
  try {
    const id: string = await userService.update(req.headers, req.query, secret);
    return handleOkResp(200, { uuid: id }, res, 'User updated successfully');
  } catch (error) {
    return handleError(error, res);
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const result = await userService.getOne(req.params);
    return handleOkResp(201, { ...result }, res, 'User searched successfully');
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  create,
  update,
  getOne,
};
