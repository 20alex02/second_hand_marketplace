import type { Response } from 'express';
import { MissingRequiredField } from '../errors/controllersErrors';
import type z from 'zod';

export function handleErrorResp(
  status: number,
  res: Response,
  msg: string
): Response {
  return res.status(status).send({
    status: 'error',
    data: {},
    message: msg,
  });
}

export function handleOkResp(
  status: number,
  data: any,
  res: Response,
  msg?: string
): Response {
  return res.status(status).send({
    status: 'success',
    data: data,
    message: msg,
  });
}

export function handleValidationErrorResp(
  error: z.ZodError,
  res: Response
): Response {
  return res.status(400).send({
    status: 'error',
    message: `Validation error: ${error.issues
      .map((issue) => issue.message)
      .join(';')}`,
  });
}

export const getRequiredField = <T>(
  data: { [x: string]: T },
  field: string
) => {
  const curField = data[field];
  if (curField === null || curField === undefined) {
    throw new MissingRequiredField(field);
  }
  return curField;
};
