import type { Request, Response } from 'express';
import { handleOkResp, handleError } from './common';
import participantService from '../services/participantService';

const getAll = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await participantService.getAll(
      req.params,
      req.headers,
      secret
    );
    return handleOkResp(
      200,
      { ...result },
      res,
      'Participants searched successfully'
    );
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  getAll,
};
