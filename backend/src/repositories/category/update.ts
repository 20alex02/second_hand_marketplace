import { Result } from '@badrap/result';
import type { CategoryUpdateData } from '../types/data';
import type { CategoryUpdateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

const updateCategory = async (
  data: CategoryUpdateData
): CategoryUpdateResult => {
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
      const { id, parentId, ...dataToUpdate } = data;

      if (parentId) {
        await tx.category.update({
          where: {
            id: id,
          },
          data: {
            parent: {
              disconnect: true,
            },
          },
        });
      }

      const category = await tx.category.update({
        where: {
          id: id,
        },
        data: {
          parent: parentId
            ? {
                connect: {
                  id: parentId,
                },
              }
            : {},
          ...dataToUpdate,
        },
      });
      return Result.ok(category);
    });
  } catch (e) {
    return genericError;
  }
};

export default updateCategory;
