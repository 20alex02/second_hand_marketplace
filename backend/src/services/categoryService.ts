import category from '../repositories/category';
import { categoryCreateSchema } from '../models/categoryModels';

export async function createCategoryService(data: any) {
  const validatedData = categoryCreateSchema.parse(data);
  const result = await category.create(validatedData);
  if (result.isOk) {
    return result.value.id;
  }
  throw result.error;
}
