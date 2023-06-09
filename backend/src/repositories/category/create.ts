import { Result } from '@badrap/result';
import type { CategoryCreateData } from '../types/data';
import type { CategoryCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  NonexistentRecordError,
  DeletedRecordError,
} from '../../errors/repositoryErrors';

const createCategory = async (
  data: CategoryCreateData
): CategoryCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      if ('parentId' in data) {
        const categoryCheck = await tx.category.findUnique({
          where: {
            id: data.parentId,
          },
        });
        if (categoryCheck === null) {
          return Result.err(new NonexistentRecordError('Parent category'));
        }
        if (categoryCheck.deletedAt !== null) {
          return Result.err(new DeletedRecordError('Parent category'));
        }
      }
      const category = await tx.category.create({
        data: {
          name: data.name,
          parent: data.parentId
            ? {
                connect: {
                  id: data.parentId,
                },
              }
            : {},
        },
      });
      return Result.ok(category);
    });
  } catch (e) {
    return genericError;
  }
};

export default createCategory;
