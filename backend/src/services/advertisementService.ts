import advertisement from '../repositories/advertisement';
import advertisementModel from '../models/advertisementModels';
import { getUserId } from './authService';
import user from '../repositories/user';
import { AdvertisementImage, Role } from '@prisma/client';
import { InvalidAccessRights } from '../errors/controllersErrors';
import type { Request } from 'express';
import { deleteUndefined } from '../controllers/common';
import type {
  AdvertisementCreateData,
  AdvertisementReadAllData,
  AdvertisementUpdateData,
} from '../repositories/types/data';
import userService from './userService';
import fs from 'fs';
import path from 'path';
import category from '../repositories/category';
import { CategoryError } from '../errors/repositoryErrors';

const create = async (
  body: Request['body'],
  headers: Request['headers'],
  files: Express.Multer.File[],
  secret?: string
) => {
  const creatorId = getUserId(headers.authorization, secret);
  const images: { path: string }[] =
    files.length === 0
      ? [{ path: 'default.jpg' }]
      : files.map((file: Express.Multer.File) => ({
          path: file.filename,
        }));
  const validatedData = advertisementModel.createSchema.parse({
    creatorId,
    ...body,
    images,
  });
  if (validatedData.description === undefined) {
    validatedData.description = '';
  }
  deleteUndefined(validatedData);
  const result = await advertisement.create(
    validatedData as AdvertisementCreateData
  );
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
};

const getAll = async (query: Request['query']) => {
  const validatedData = advertisementModel.getAllSchema.parse(query);
  deleteUndefined(validatedData);
  const result = await advertisement.read.all(
    validatedData as AdvertisementReadAllData
  );
  if (result.isErr) {
    throw result.error;
  }
  const withoutParticipants = result.value.map(
    ({ participants, ...rest }) => rest
  );
  const adCount = await advertisement.read.allCount(
    validatedData as AdvertisementReadAllData
  );
  if (adCount.isErr) {
    throw adCount.error;
  }
  return {
    advertisements: withoutParticipants,
    advertisementCount: adCount.value,
  };
};

const adminGetAll = async (
  params: Request['params'],
  query: Request['query'],
  headers: Request['headers'],
  secret?: string
) => {
  const id = getUserId(headers.authorization, secret);
  if (!(await userService.isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const userResult = await user.read.one({ id: id });
  if (userResult.isErr) {
    throw userResult.error;
  }
  const validatedData = advertisementModel.getAllAdminSchema.parse({
    ...params,
    ...query,
  });
  const result = await advertisement.read.all(
    validatedData as AdvertisementReadAllData
  );
  if (result.isErr) {
    throw result.error;
  }
  const adCount = await advertisement.read.allCount(
    validatedData as AdvertisementReadAllData
  );
  if (adCount.isErr) {
    throw adCount.error;
  }
  return { advertisements: result.value, advertisementCount: adCount.value };
};

const getAllMe = async (
  query: Request['query'],
  headers: Request['headers'],
  secret?: string
) => {
  const id = getUserId(headers.authorization, secret);
  const validatedData = advertisementModel.getAllForCreatorSchema.parse({
    creatorId: id,
    ...query,
  });
  const result = await advertisement.read.all(
    validatedData as AdvertisementReadAllData
  );
  if (result.isErr) {
    throw result.error;
  }
  const adCount = await advertisement.read.allCount(
    validatedData as AdvertisementReadAllData
  );
  if (adCount.isErr) {
    throw adCount.error;
  }
  return { advertisements: result.value, advertisementCount: adCount.value };
};

const getOne = async (params: Request['params']) => {
  const validatedData = advertisementModel.getOneSchema.parse(params);
  const result = await advertisement.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  // const categories = await category.read.one({ id: result.value.categories });
  const { participants, creator, categories, ...rest } = result.value;
  if (categories[0] === undefined) {
    throw new CategoryError();
  }
  const categoryTree = await category.read.one({
    id: categories[0].id,
  });
  if (categoryTree.isErr) {
    throw categoryTree.error;
  }
  return {
    ...rest,
    phoneNumber: creator.phoneNumber,
    email: creator.email,
    categories: categoryTree.value,
  };
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
  const updateData = { id, ...validatedData };
  deleteUndefined(updateData);
  const advert = await advertisement.read.one({ id: id });
  if (advert.isErr) {
    throw advert.error;
  }
  const result = await advertisement.update(
    updateData as AdvertisementUpdateData
  );
  if (result.isErr) {
    throw result.error;
  }
  advert.value.images.forEach((file: AdvertisementImage) => {
    fs.unlink(path.join('/src/images', file.path), (err) => {
      if (err) {
        throw new Error();
      }
    });
  });
  return result.value.id;
};

export default {
  create,
  getAll,
  adminGetAll,
  getAllMe,
  getOne,
  delete: deleteAdvertisement,
  update,
};
