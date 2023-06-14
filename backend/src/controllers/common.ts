import type { Response } from 'express';
import {
  InvalidAccessRights,
  MissingRequiredField,
} from '../errors/controllersErrors';
import { z } from 'zod';
import {
  NonexistentRecordError,
  DeletedRecordError,
  ConflictingRecordError,
  CategoryDeletionError,
} from '../errors/repositoryErrors';
import { InvalidToken, WrongPassword } from '../errors/controllersErrors';

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
    data,
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

export const getOptionalField = <T>(
  data: { [x: string]: T | null },
  field: string
) => {
  const curField = data[field];
  if (curField === null || curField === undefined) {
    return null;
  }
  return curField;
};

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof z.ZodError) {
    return handleValidationErrorResp(error, res);
  }
  if (error instanceof NonexistentRecordError) {
    return handleErrorResp(422, res, error.message);
  }
  if (error instanceof DeletedRecordError) {
    return handleErrorResp(422, res, error.message);
  }
  if (error instanceof ConflictingRecordError) {
    return handleErrorResp(422, res, error.message);
  }
  if (error instanceof CategoryDeletionError) {
    return handleErrorResp(422, res, error.message);
  }
  if (error instanceof InvalidToken) {
    return handleErrorResp(401, res, error.message);
  }
  if (error instanceof WrongPassword) {
    return handleErrorResp(400, res, error.message);
  }
  if (error instanceof InvalidAccessRights) {
    return handleErrorResp(401, res, error.message);
  }
  return handleErrorResp(500, res, 'Unknown error');
};

export function deleteUndefined<T extends object>(obj: T) {
  Object.keys(obj).forEach((key) => {
    if (obj[key as keyof T] === undefined) {
      delete obj[key as keyof T];
    }
  });
}
