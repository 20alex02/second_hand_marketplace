import { Result } from '@badrap/result';
import type { UserReadOneData, UserReadAllData } from '../types/data';
import type { UserReadOneResult, UserReadAllResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const readOneUser = async (data: UserReadOneData): UserReadOneResult => {
  try {
    const user = await client.user.findUnique({
      where: data,
      include: {
        advertisements: {
          where: {
            deletedAt: null,
          },
        },
        participants: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    if (user == null) {
      return Result.err(new NonexistentRecordError('User '));
    }
    if (user.deletedAt != null) {
      return Result.err(new DeletedRecordError('User '));
    }
    return Result.ok(user);
  } catch (e) {
    return genericError;
  }
};

const readAllUser = async (data: UserReadAllData): UserReadAllResult => {
  try {
    const { perPage, pageNum, ...filters } = data;
    const users = await client.user.findMany({
      where: {
        deletedAt: null,
        ...filters,
      },
      skip: (pageNum - 1) * perPage,
      take: perPage,
    });
    return Result.ok(users);
  } catch (e) {
    return genericError;
  }
};

export default {
  one: readOneUser,
  all: readAllUser,
};
