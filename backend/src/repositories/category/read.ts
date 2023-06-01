import { Result } from '@badrap/result';
import type { CategoryReadOneData, CategoryReadAllData } from '../types/data';
import type {
  CategoryReadOneResult,
  CategoryReadAllResult,
} from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

export const readOneCategory = async (
  data: CategoryReadOneData
): CategoryReadOneResult => {
  try {
    const category = await client.category.findUnique({
      where: {
        id: data.id,
      },
      include: {
        advertisements: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    if (category == null) {
      return Result.err(new NonexistentRecordError('category does not exists'));
    }
    if (category.deletedAt != null) {
      return Result.err(new DeletedRecordError('category already deleted'));
    }
    return Result.ok(category);
  } catch (e) {
    return genericError;
  }
};

export const readAllCategory = async (
  data: CategoryReadAllData
): CategoryReadAllResult => {
  try {
    const categories = await client.category.findMany({
      where: {
        deletedAt: null,
        advertisements: {
          some: {
            id: data.id,
          },
        },
      },
    });
    return Result.ok(categories);
  } catch (e) {
    return genericError;
  }
};
