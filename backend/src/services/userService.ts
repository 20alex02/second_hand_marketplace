import { hashPassword } from './authService';
import user from '../repositories/user';
import userModel from '../models/userModels';
import { getUserId } from './authService';

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
  const authHeader = headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const id = getUserId(token, secret);
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

export default {
  create,
  update,
};
