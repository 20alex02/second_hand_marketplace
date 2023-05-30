import { Result } from '@badrap/result';
import type { CategoryCreateData } from '../types/data';
import type { CategoryCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';

const create = async (
  data: CategoryCreateData,
): CategoryCreateResult => {
  try {
    if ('parentId' in data) {
      
    }
    const Category = await client.category.create({
      data: {
        ...data,
        // user: {
        //   connect: userId,
        // },
      },
    });
    return Result.ok(Category);
  } catch (e) {
    return genericError;
  }
};

export default create;
