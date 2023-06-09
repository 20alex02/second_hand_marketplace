import advertisement from '../repositories/advertisement';
import advertisementModel from '../models/advertisementModels';
import { getUserId } from './authService';

export const create = async (
  data: any,
  headers: any,
  files: Express.Multer.File[],
  secret?: string
) => {
  const authHeader = headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const creatorId = getUserId(token, secret);
  const images: { path: string }[] = files.map((file: Express.Multer.File) => ({
    path: file.path,
  }));

  const validatedData = advertisementModel.createSchema.parse({
    creatorId,
    ...data,
    images,
  });
  const result = await advertisement.create(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
};

export const getAll = async (data: any) => {
  const validatedData = advertisementModel.getAllSchema.parse(data);
  const result = await advertisement.read.all(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
};

export default {
  create,
  search: getAll,
};
