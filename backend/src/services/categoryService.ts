import category from '../repositories/category';
import categoryModel from '../models/categoryModels';
import { getUserId } from './authService';
import user from '../repositories/user';
import { Role } from '@prisma/client';
import { InvalidAccessRights } from '../errors/controllersErrors';

async function create(data: any) {
  const validatedData = categoryModel.createSchema.parse(data);
  const result = await category.create(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function getOne(data: any, headers: any, secret?: string) {
  const authHeader = headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const id = getUserId(token, secret);
  const validatedData = categoryModel.getOneSchema.parse(data);
  const userResult = await user.read.one({ id: id });
  if (userResult.isErr) {
    throw userResult.error;
  }
  if (userResult.value.role !== Role.ADMIN) {
    throw new InvalidAccessRights();
  }
  const result = await category.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
}

async function update(data: any, query: any, headers: any, secret?: string) {
  const authHeader = headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const id = getUserId(token, secret);
  const validatedData = categoryModel.updateSchema.parse({ ...data, ...query });
  const userResult = await user.read.one({ id: id });
  if (userResult.isErr) {
    throw userResult.error;
  }
  if (userResult.value.role !== Role.ADMIN) {
    throw new InvalidAccessRights();
  }
  const result = await category.update(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
}

export default {
  create,
  getOne,
  update,
};
