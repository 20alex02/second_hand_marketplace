import category from '../repositories/category';
import categoryModel from '../models/categoryModels';
import { getUserId } from './authService';
import { InvalidAccessRights } from '../errors/controllersErrors';
import userService from './userService';

async function create(data: any) {
  const validatedData = categoryModel.createSchema.parse(data);
  const result = await category.create(validatedData);
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
  return result.value;
}

async function getAll() {
  const result = await category.read.all({});
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
}

async function update(params: any, query: any, headers: any, secret?: string) {
  const validatedData = categoryModel.updateSchema.parse({
    ...params,
    ...query,
  });
  const id = getUserId(headers, secret);
  if (!(await userService.isAdmin(id))) {
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
  getAll,
  update,
};
