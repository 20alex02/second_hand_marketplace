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
    return handleError(error as Error, res);
  }
};

// const join = async (req: Request, res: Response, secret?: string) => {
//   try {
//     const data = req.body;
//     const getParams = req.params;
//     let userId = null;
//     try {
//       userId = getUserId(req.headers.authorization, secret);
//     } catch (error) {
//       console.log('Adding by phone number.');
//     }
//     const phoneNumber: string | null = getOptionalField(data, 'phoneNumber');
//     const advertId = getRequiredField(getParams, 'advertisementId');
//     if (userId === null && phoneNumber === null) {
//       throw new Error('Either userId or phoneNumber must be filled');
//     }
//     const result = await participantService.join({
//       userId: userId,
//       phoneNumber: phoneNumber,
//       advertId: advertId,
//     });
//     return handleOkResp(
//       201,
//       { uuid: result },
//       res,
//       'Join as participant was successful'
//     );
//   } catch (error) {
//     return handleError(error as Error, res);
//   }
// };

const join = async (req: Request, res: Response, secret?: string) => {
  try {
    const result = await participantService.join(
      req.params,
      req.body,
      req.headers,
      secret
    );
    return handleOkResp(
      201,
      { uuid: result },
      res,
      'Join as participant was successful'
    );
  } catch (error) {
    return handleError(error as Error, res);
  }
};

export default {
  getAll,
  join,
};
