import advertisement from '../repositories/advertisement';
import advertisementModel from '../models/advertisementModels';
import { getUserId } from './authService';
import user from '../repositories/user';
import { Role } from '@prisma/client';
import { InvalidAccessRights } from '../errors/controllersErrors';
import type { Request } from 'express';

const create = async (
  body: Request['body'],
  headers: Request['headers'],
  files: Express.Multer.File[],
  secret?: string
) => {
  const creatorId = getUserId(headers.authorization, secret);
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

const getAll = async (query: Request['query']) => {
  const validatedData = advertisementModel.getAllSchema.parse(query);
  const result = await advertisement.read.all(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
};

const getOne = async (params: Request['params']) => {
  const validatedData = advertisementModel.getOneSchema.parse(params);
  const result = await advertisement.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  const { participants, creator, ...rest } = result.value;
  return rest;
};

const deleteAdvertisement = async (
  params: Request['params'],
  headers: Request['headers'],
  secret?: string
) => {
  const validatedData = advertisementModel.deleteSchema.parse(params);
  const creatorId = getUserId(headers.authorization, secret);
  const userResult = await user.read.one({ id: creatorId });
  if (userResult.isErr) {
    throw userResult.error;
  }
  if (
    userResult.value.role !== Role.ADMIN &&
    !userResult.value.advertisements.some(
      (ad) => ad.creatorId === validatedData.id
    )
  ) {
    throw new InvalidAccessRights();
  }
  const result = await advertisement.delete(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
};

const update = async (
  body: Request['body'],
  params: Request['params'],
  files: Express.Multer.File[],
  headers: Request['headers'],
  secret?: string
) => {
  const createImages: { path: string }[] = files.map(
    (file: Express.Multer.File) => ({
      path: file.path,
    })
  );
  const { id, ...validatedData } = advertisementModel.updateSchema.parse({
    ...body,
    ...params,
    createImages,
  });
  const creatorId = getUserId(headers.authorization, secret);
  const userResult = await user.read.one({ id: creatorId });
  if (userResult.isErr) {
    throw userResult.error;
  }
  if (
    userResult.value.role !== Role.ADMIN &&
    !userResult.value.advertisements.some((ad) => ad.creatorId === id)
  ) {
    throw new InvalidAccessRights();
  }
  const result = await advertisement.update({ id, ...validatedData });
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
};

export default {
  create,
  getAll,
  getOne,
  delete: deleteAdvertisement,
  update,
};
