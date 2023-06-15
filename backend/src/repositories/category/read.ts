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
    let getNextCategory = true;
    let id = data.id;
    while (getNextCategory) {
      const category = await client.category.findUnique({
        where: { id },
        include: {
          advertisements: true,
        },
      });
      if (category == null) {
        return Result.err(new NonexistentRecordError('Category'));
      }
      if (category.deletedAt != null) {
        return Result.err(new DeletedRecordError('Category'));
      }
      categories.push(category);
      if (category.parentId === null) {
        getNextCategory = false;
      } else {
        id = category.parentId;
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
