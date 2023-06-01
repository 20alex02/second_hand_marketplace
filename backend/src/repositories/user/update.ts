import { Result } from '@badrap/result';
import type { UserUpdateData } from '../types/data';
import type { UserUpdateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

const updateUser = async (data: UserUpdateData): UserUpdateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const userCheck = await tx.user.findUnique({
        where: {
          id: data.id,
        },
      });
      if (userCheck === null) {
        return Result.err(new NonexistentRecordError('user does not exists'));
      }
      if (userCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('user already deleted'));
      }
      const { id, ...dataToUpdate } = data;
      const user = await tx.user.update({
        where: {
          id: id,
        },
        data: dataToUpdate,
      });
      return Result.ok(user);
    });
  } catch (e) {
    return genericError;
  }
};

export default updateUser;
