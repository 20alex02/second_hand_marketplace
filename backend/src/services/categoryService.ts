import type { CategoryCreateData } from '../repositories/types/data';
import createCategory from '../repositories/category/create';

export async function createCategoryService(
  name: string,
  parentId: string | null
) {
  const category: CategoryCreateData =
    parentId === null
      ? {
          name: name,
        }
      : {
          name: name,
          parentId: parentId,
        };
  const result = await createCategory(category);
  if (result.isOk) {
    return result.value.id;
  }
  throw result.error;
}
