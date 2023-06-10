import { Result } from '@badrap/result';
import type { UserUpdateData } from '../types/data';
import type { UserUpdateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
  ConflictingRecordError,
} from '../../errors/repositoryErrors';

const updateUser = async (data: UserUpdateData): UserUpdateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const userCheck = await tx.user.findUnique({
        where: {
          id: data.id,
        },
      });
      if (userCheck === null) {
        return Result.err(new NonexistentRecordError('User'));
      }
      if (userCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('User'));
      }
      if (data.email) {
        const emailCheck = await tx.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (emailCheck !== null) {
          return Result.err(new ConflictingRecordError('User', 'email'));
        }
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
