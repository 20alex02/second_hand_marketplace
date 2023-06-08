import advertisement from '../repositories/advertisement';
import advertisementModel from '../models/advertisementModels';
import { getUserId } from './authService';

export const create = async (body: any, headers: any, secret: string) => {
  const authHeader = headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const creatorId = getUserId(token, secret);
  const validatedData = advertisementModel.createSchema.parse({
    creatorId,
    ...body,
  });
  const result = await advertisement.create(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
};

export const getAll = async (data: any) => {
  const validatedData = advertisementModel.getAllSchema.parse(data);
  const result = await advertisement.read.all(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.map((val) => val.id);
};

export default {
  create,
  search: getAll,
};
