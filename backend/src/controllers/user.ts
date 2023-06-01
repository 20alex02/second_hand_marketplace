import type { Request, Response } from 'express';
import { createUserService } from '../services/userService';
import { ConflictingRecordError } from '../repositories/types/errors';
import MissingRequiredField from '../exceptions/MissingRequiredField';
import type { ApiResponse } from './types';
import {
  createErrorResponse,
  getRequiredField,
  handleMissingField,
} from './common';
import isEmailValid from '../services/validatorService';
import EmailIsNotValid from '../exceptions/EmailIsNotValid';

export const actionCreateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const email = getRequiredField(data, 'email');
    if (!isEmailValid(email)) {
      throw new EmailIsNotValid();
    }
    const phoneNumber = getRequiredField(data, 'phoneNumber');
    const password = getRequiredField(data, 'password');

    const id = await createUserService(email, phoneNumber, password);
    const response: ApiResponse<object> = {
      status: 'success',
      data: {
        uuid: id,
      },
      message: 'User created successfully',
    };
    return res.status(201).send(response);
  } catch (error) {
    if (error instanceof MissingRequiredField) {
      return res.status(400).send(handleMissingField(error.field));
    }
    if (error instanceof ConflictingRecordError) {
      return res.status(422).send(createErrorResponse(error.message));
    }
    if (error instanceof EmailIsNotValid) {
      return res.status(422).send(createErrorResponse(error.message));
    }
    return res.status(500).send(createErrorResponse('Error occurred'));
  }
};
