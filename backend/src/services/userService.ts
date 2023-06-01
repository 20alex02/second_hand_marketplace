import { hashPassword } from './authService';
import type { UserCreateData } from '../repositories/types/data';
import createUser from '../repositories/user/create';

export async function createUserService(
  email: string,
  phoneNumber: string,
  password: string
) {
  const hashedPassword = hashPassword(password);
  const user: UserCreateData = {
    email: email,
    phoneNumber: phoneNumber,
    hashedPassword: hashedPassword.hashedPassword,
    salt: hashedPassword.salt,
  };
  const result = await createUser(user);
  if (result.isOk) {
    return result.value.id;
  }
  throw result.error;
}
