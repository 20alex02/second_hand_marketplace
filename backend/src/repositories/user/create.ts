import { Result } from '@badrap/result';
import type { UserCreateData } from '../types/data';
import type { UserCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';

const create = async (data: UserCreateData): UserCreateResult => {
  try {
    const user = await client.user.create({
      data: {
        ...data,
      },
    });
    return Result.ok(user);
  } catch (e) {
    return genericError;
  }
};

export default create;
