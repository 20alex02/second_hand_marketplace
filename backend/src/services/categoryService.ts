import category from '../repositories/category';
import categoryModel, { updateschematype } from '../models/categoryModels';
import { getUserId } from './authService';
import { InvalidAccessRights } from '../errors/controllersErrors';
import userService from './userService';
import type { Request } from 'express';
import type {
  CategoryCreateData,
  CategoryUpdateData,
} from '../repositories/types/data';
import { deleteUndefined } from '../controllers/common';

async function create(body: any, headers: any, secret?: string) {
  const id = getUserId(headers, secret);
  if (!(await userService.isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const validatedData = categoryModel.createSchema.parse(body);
  deleteUndefined(validatedData);
  const result = await category.create(validatedData as CategoryCreateData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function getOne(data: any, headers: any, secret?: string) {
  const validatedData = categoryModel.getOneSchema.parse(data);
  const id = getUserId(headers, secret);
  if (!(await userService.isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const result = await category.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  const { advertisements, ...rest } = result.value;
  return rest;
}

async function update(
  params: Request['params'],
  query: Request['query'],
  headers: Request['headers'],
  secret?: string
) {
  const validatedData: updateschematype = categoryModel.updateSchema.parse({
    ...params,
    ...query,
  });
  const id = getUserId(headers, secret);
  if (!(await userService.isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  deleteUndefined(validatedData);
  const result = await category.update(validatedData as CategoryUpdateData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function deleteCategory(params: any, headers: any, secret?: string) {
  const validatedData = categoryModel.deleteSchema.parse(params);
  const id = getUserId(headers, secret);
  if (!(await userService.isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const result = await category.delete(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

export default {
  create,
  getOne,
  update,
  delete: deleteCategory,
};
