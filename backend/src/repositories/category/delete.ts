import { Result } from '@badrap/result';
import type { CategoryDeleteData } from '../types/data';
import type { CategoryDeleteResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  NonexistentRecordError,
  DeletedRecordError,
  CategoryDeletionError,
} from '../../errors/repositoryErrors';

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
        include: {
          subcategories: true,
          advertisements: true,
        },
      });
      if (categoryCheck === null) {
        return Result.err(new NonexistentRecordError('Category'));
      }
      if (categoryCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('Category'));
      }
      if (categoryCheck.subcategories.length !== 0) {
        return Result.err(new CategoryDeletionError('subcategories'));
      }
      if (categoryCheck.advertisements.length !== 0) {
        return Result.err(new CategoryDeletionError('advertisements'));
      }
      if (categoryCheck.parentId !== null) {
        await tx.category.update({
          where: {
            id: categoryCheck.parentId,
          },
          data: {
            subcategories: {
              disconnect: { id: data.id },
            },
          },
        });
      }

      const category = await tx.category.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt,
          parent: {
            disconnect: true,
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
