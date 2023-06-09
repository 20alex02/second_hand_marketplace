import { Result } from '@badrap/result';
import type { UserCreateData } from '../types/data';
import type { UserCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { ConflictingRecordError } from '../../errors/repositoryErrors';

const createUser = async (data: UserCreateData): UserCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const userCheck = await tx.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (userCheck !== null) {
        return Result.err(new ConflictingRecordError('User', 'email'));
      }
      const user = await tx.user.create({
        data: data,
      });
      return Result.ok(user);
    });
  } catch (e) {
    return genericError;
  }
};

export default createUser;
