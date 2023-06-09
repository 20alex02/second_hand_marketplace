import { Result } from '@badrap/result';
import type { UserDeleteData } from '../types/data';
import type { UserDeleteResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const deleteUser = async (data: UserDeleteData): UserDeleteResult => {
  const deletedAt = new Date();
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
      const user = await tx.user.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: deletedAt,
          advertisements: {
            updateMany: {
              where: {
                deletedAt: null,
              },
              data: {
                deletedAt: deletedAt,
              },
            },
          },
          participants: {
            updateMany: {
              where: {
                deletedAt: null,
              },
              data: {
                deletedAt: deletedAt,
              },
            },
          },
        },
        include: {
          advertisements: {
            where: {
              deletedAt: deletedAt,
            },
          },
          participants: {
            where: {
              deletedAt: deletedAt,
            },
          },
        },
      });
      return Result.ok(user);
    });
  } catch (e) {
    return genericError;
  }
};

export default deleteUser;
