import { hashPassword } from './authService';
import user from '../repositories/user';
import { userCreateSchema } from '../models/userModels';

export async function createUserService(data: any) {
  const { password, ...validatedData } = userCreateSchema.parse(data);
  const hashedPassword = hashPassword(password);
  const result = await user.create({ ...validatedData, ...hashedPassword });
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}
