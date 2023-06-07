import type { Request, Response } from 'express';
import {
  createErrorResponse,
  getOptionalField,
  getRequiredField,
  handleMissingField,
} from './common';
import type { ApiResponse } from './types';
import MissingRequiredField from '../exceptions/MissingRequiredField';
import { getUserId } from '../services/authService';
import { isTypeValid } from '../services/validatorService';
import NotValidType from '../exceptions/NotValidType';
import type { AdvertisementType } from '@prisma/client';
import TokenIsNotValid from '../exceptions/NotAuthorized';
import { createAdvertisementService } from '../services/advertisementService';

export const actionCreateAdvertisement = async (
  req: Request,
  res: Response,
  secret: string
) => {
  try {
    const data = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const creatorId = getUserId(token, secret);
    const title: string = getRequiredField(data, 'title');
    const type: string = getRequiredField(data, 'type');
    if (!isTypeValid(type)) {
      throw new NotValidType();
    }
    const categories: string[] = getRequiredField(data, 'categories');
    const description: string = getRequiredField(data, 'description');
    const estimatedPrice: number | null = getOptionalField(
      data,
      'estimatedPrice'
    );

    const id = await createAdvertisementService(
      title,
      type as AdvertisementType,
      description,
      estimatedPrice,
      false,
      creatorId,
      [],
      categories
    );
    const response: ApiResponse<object> = {
      status: 'success',
      data: {
        uuid: id,
      },
      message: 'Advertisement created successfully',
    };
    return res.status(201).send(response);
  } catch (error) {
    if (error instanceof MissingRequiredField) {
      return res.status(400).send(handleMissingField(error.field));
    }
    if (error instanceof NotValidType) {
      return res.status(422).send(createErrorResponse(error.message));
    }
    if (error instanceof TokenIsNotValid) {
      return res.status(401).send(createErrorResponse(error.message));
    }
    console.log(error);
    return res.status(500).send(createErrorResponse('Error occurred'));
  }
};
