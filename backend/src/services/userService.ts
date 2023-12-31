import { hashPassword } from './authService';
import user from '../repositories/user';
import userModel from '../models/userModels';
import { getUserId } from './authService';
import { Role } from '@prisma/client';
import { InvalidAccessRights } from '../errors/controllersErrors';
import type { Request } from 'express';
import { deleteUndefined } from '../controllers/common';
import type { UserUpdateData } from '../repositories/types/data';

async function isAdmin(id: string) {
  const userResult = await user.read.one({ id: id });
  if (userResult.isErr) {
    throw userResult.error;
  }
  return userResult.value.role === Role.ADMIN;
}

async function create(body: Request['body']) {
  const { password, ...validatedData } = userModel.createSchema.parse(body);
  const hashedPassword = hashPassword(password);
  const result = await user.create({ ...validatedData, ...hashedPassword });
  if (result.isErr) {
    if (result.error.message === 'ConflictingemailinUser') {
      result.error.message =
        'User with email ' + body.email + ' already exist.';
    }
    throw result.error;
  }
  return result.value.id;
}

async function update(
  headers: Request['headers'],
  query: Request['query'],
  secret?: string
) {
  const id = getUserId(headers.authorization, secret);
  const { password, role, ...validatedData } = userModel.updateSchema.parse({
    id: id,
    ...query,
  });
  const hashedPassword = password ? hashPassword(password) : {};
  if (role && !(await isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const updateData = { ...validatedData, ...hashedPassword };
  deleteUndefined(updateData);
  const result = await user.update(updateData as UserUpdateData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function adminUpdate(
  headers: Request['headers'],
  params: Request['params'],
  secret?: string
) {
  const id = getUserId(headers.authorization, secret);
  if (!(await isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const { ...validatedData } = userModel.adminUpdateSchema.parse({
    ...params,
  });
  const result = await user.update({ ...validatedData, role: Role.ADMIN });
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function getOne(
  params: Request['params'],
  headers: Request['headers'],
  secret?: string
) {
  const id = getUserId(headers.authorization, secret);
  if (!(await isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const validatedData = userModel.getOneSchema.parse(params);
  const result = await user.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  const {
    salt,
    hashedPassword,
    deletedAt,
    participants,
    advertisements,
    ...rest
  } = result.value;
  return rest;
}

async function getById(id: string) {
  const result = await user.read.one({ id: id });
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
}

async function getAll(headers: Request['headers'], secret?: string) {
  const id = getUserId(headers.authorization, secret);
  if (!(await isAdmin(id))) {
    throw new InvalidAccessRights();
  }
  const result = await user.read.all({});
  if (result.isErr) {
    throw result.error;
  }
  const filtered = result.value.map(
    ({ hashedPassword, salt, deletedAt, ...rest }) => rest
  );
  return filtered;
}

export default {
  isAdmin,
  create,
  update,
  adminUpdate,
  getOne,
  getAll,
  getById,
};
