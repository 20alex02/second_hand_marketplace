import { Result } from '@badrap/result';
import type { CategoryReadOneData } from '../types/data';
import type {
  CategoryReadOneResult,
  CategoryReadAllResult,
} from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const readOneCategory = async (
  data: CategoryReadOneData
): CategoryReadOneResult => {
  try {
    const categories = [];
    let category = await client.category.findUnique({
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
      return Result.err(new NonexistentRecordError('Category'));
    }
    if (category.deletedAt != null) {
      return Result.err(new DeletedRecordError('Category'));
    }
    categories.push(category);
    while (category?.parentId !== null) {
      category = await client.category.findUnique({
        where: {
          id: category.parentId,
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
        return Result.err(new NonexistentRecordError('Category'));
      }
      if (category.deletedAt != null) {
        return Result.err(new DeletedRecordError('Category'));
      }
    }
    return Result.ok(categories);
  } catch (e) {
    return genericError;
  }
};

const readAllCategory = async (): CategoryReadAllResult => {
  try {
    const categories = await client.category.findMany({
      where: {
        deletedAt: null,
      },
    });
    return Result.ok(categories);
  } catch (e) {
    return genericError;
  }
};

export default {
  one: readOneCategory,
  all: readAllCategory,
};
