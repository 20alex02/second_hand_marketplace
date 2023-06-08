import { hashPassword } from './authService';
import user from '../repositories/user';
import userModel from '../models/userModels';

async function create(data: any) {
  const { password, ...validatedData } = userModel.createSchema.parse(data);
  const hashedPassword = hashPassword(password);
  const result = await user.create({ ...validatedData, ...hashedPassword });
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

export default {
  create,
};
