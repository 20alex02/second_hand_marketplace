import { hashPassword } from './authService';
import user from '../repositories/user';
import userModel from '../models/userModels';
import { getUserId } from './authService';
import { Role } from '@prisma/client';

async function isAdmin(id: string) {
  const userResult = await user.read.one({ id: id });
  if (userResult.isErr) {
    throw userResult.error;
  }
  return userResult.value.role !== Role.ADMIN;
}

async function create(data: any) {
  const { password, ...validatedData } = userModel.createSchema.parse(data);
  const hashedPassword = hashPassword(password);
  const result = await user.create({ ...validatedData, ...hashedPassword });
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function update(headers: any, query: any, secret?: string) {
  const id = getUserId(headers, secret);
  const { password, ...validatedData } = userModel.updateSchema.parse({
    id,
    ...query,
  });
  const hashedPassword = password ? hashPassword(password) : {};
  const result = await user.update({ ...validatedData, ...hashedPassword });
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function getOne(params: any) {
  const validatedData = userModel.getOneSchema.parse(params);
  const result = await user.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
}

export default {
  isAdmin,
  create,
  update,
  getOne,
};
