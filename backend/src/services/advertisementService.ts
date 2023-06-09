import advertisement from '../repositories/advertisement';
import advertisementModel from '../models/advertisementModels';
import { getUserId } from './authService';

export const create = async (
  body: any,
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
    ...body,
    images,
  });
  const result = await advertisement.create(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
};

export const getAll = async (data: any) => {
  const { pageNum, perPage, ...validatedData } =
    advertisementModel.getAllSchema.parse(data);
  const result = await advertisement.read.all(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.map((val) => val.id);
  // .slice(pageNum * perPage, (pageNum + 1) * perPage);

  /* TODO just 1 query, store all advertisements somewhere for better pagination
    so there are no redundant queries and next page loads by .slice()
    */
};

export default {
  create,
  search: getAll,
};
