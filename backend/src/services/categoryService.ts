import category from '../repositories/category';
import categoryModel from '../models/categoryModels';

async function create(data: any) {
  const validatedData = categoryModel.createSchema.parse(data);
  const result = await category.create(validatedData);
  if (result.isOk) {
    return result.value.id;
  }
  throw result.error;
}

export default {
  create,
};
