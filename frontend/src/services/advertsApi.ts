import axiosInstance from './base';
import { CategoryResponse } from '../models/advert';

export const getCategories = async () => {
  const response = await axiosInstance.get<CategoryResponse>('api/category');
  return response.data;
};
