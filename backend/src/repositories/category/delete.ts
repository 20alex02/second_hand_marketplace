import { Result } from '@badrap/result';
import type { CategoryDeleteData } from '../types/data';
import type { CategoryDeleteResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { NonexistentRecordError, DeletedRecordError } from '../types/errors';

// TODO solve recursive delete and include
const deleteCategory = async (
  data: CategoryDeleteData
): CategoryDeleteResult => {
  const deletedAt = new Date();
  try {
    return await client.$transaction(async (tx) => {
      const categoryCheck = await tx.category.findUnique({
        where: {
          id: data.id,
        },
      });
      if (categoryCheck === null) {
        return Result.err(
          new NonexistentRecordError('category does not exists')
        );
      }
      if (categoryCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('category already deleted'));
      }
      const category = await tx.category.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: deletedAt,
          subcategories: {
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
          subcategories: {
            where: {
              deletedAt: deletedAt,
            },
          },
        },
      });
      return Result.ok(category);
    });
  } catch (e) {
    return genericError;
  }
};

export default deleteCategory;
