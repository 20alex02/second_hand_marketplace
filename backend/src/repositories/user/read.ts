import { Result } from '@badrap/result';
import type {
  UserReadOneData,
  UserReadAllData,
  UserReadOneUserByEmail,
} from '../types/data';
import type { UserReadOneResult, UserReadAllResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

const readOneUserByEmail = async (
  data: UserReadOneUserByEmail
): UserReadOneResult => {
  try {
    const user = await client.user.findUnique({
      where: {
        email: data.email,
      },
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
      return Result.err(new NonexistentRecordError('user does not exists'));
    }
    if (user.deletedAt != null) {
      return Result.err(new DeletedRecordError('user already deleted'));
    }
    return Result.ok(user);
  } catch (e) {
    return genericError;
  }
};

const readOneUser = async (data: UserReadOneData): UserReadOneResult => {
  try {
    const user = await client.user.findUnique({
      where: {
        id: data.id,
      },
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
      return Result.err(new NonexistentRecordError('user does not exists'));
    }
    if (user.deletedAt != null) {
      return Result.err(new DeletedRecordError('user already deleted'));
    }
    return Result.ok(user);
  } catch (e) {
    return genericError;
  }
};

const readAllUser = async (data: UserReadAllData): UserReadAllResult => {
  try {
    const users = await client.user.findMany({
      where: {
        deletedAt: null,
        ...data,
      },
    });
    return Result.ok(users);
  } catch (e) {
    return genericError;
  }
};

export default {
  oneById: readOneUser,
  oneByEmail: readOneUserByEmail,
  all: readAllUser,
};
