import category from '../repositories/category';
import categoryModel from '../models/categoryModels';

async function create(data: any) {
  const validatedData = categoryModel.createSchema.parse(data);
  const result = await category.create(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value.id;
}

async function getOne(data: any) {
  const validatedData = categoryModel.getOneSchema.parse(data);
  const result = await category.read.one(validatedData);
  if (result.isErr) {
    throw result.error;
  }
  return result.value;
}

export default {
  create,
  getOne,
};
