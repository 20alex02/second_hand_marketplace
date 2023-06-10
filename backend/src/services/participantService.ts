import participant from '../repositories/participant';
import participantModel from '../models/participantModels';
import { getUserId } from './authService';
import user from '../repositories/user';
import { Role } from '@prisma/client';
import { InvalidAccessRights } from '../errors/controllersErrors';

const getAll = async (params: any, headers: any, secret?: string) => {
  const id = getUserId(headers, secret);
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

export default {
  getAll,
};
