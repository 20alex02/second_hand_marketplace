import participant from '../repositories/participant';
import participantModel from '../models/participantModels';
import { getUserId } from './authService';
import user from '../repositories/user';
import { Role } from '@prisma/client';
import { InvalidAccessRights } from '../errors/controllersErrors';
import type { ParticipantCreateData } from '../repositories/types/data';
import type { Request } from 'express';

const getAll = async (
  params: Request['params'],
  headers: Request['headers'],
  secret?: string
) => {
  const id = getUserId(headers.authorization, secret);
  const userResult = await user.read.one({ id: id });
  if (userResult.isErr) {
    throw userResult.error;
  }
  if (
    userResult.value.role !== Role.ADMIN &&
    !userResult.value.advertisements.some((ad) => ad.creatorId === id)
  ) {
    throw new InvalidAccessRights();
  }
  const validatedData = participantModel.getAllSchema.parse(params);
  const result = await participant.read.all(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
};

const join = async (params: {
  advertId: string;
  userId: string | null;
  phoneNumber: string | null;
}) => {
  let userPhone = params.phoneNumber;
  if (userPhone === null) {
    if (params.userId === null) {
      throw new Error('UserId can not be null');
    }
    const userResult = await user.read.one({ id: params.userId });
    if (userResult.isErr) {
      throw userResult.error;
    }
    userPhone = userResult.value.phoneNumber;
  }
  const data: ParticipantCreateData = {
    advertisementId: params.advertId,
    phoneNumber: userPhone,
  };
  if (params.userId) {
    data.userId = params.userId;
  }

  const result = await participant.create(data);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
};

export default {
  getAll,
  join,
};
