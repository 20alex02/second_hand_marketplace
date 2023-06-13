import axiosInstance from './base';
import { AxiosResponse } from 'axios';

export const getCategories = async () => {
  const response = await axiosInstance.get<AxiosResponse>('api/category');
  return response.data;
};

export const getAdverts = async (
  pageNum: number,
  categoryIds: string[] | undefined
) => {
  const response = await axiosInstance.get<AxiosResponse>('api/advertisement', {
    params: {
      pageNum: pageNum,
      perPage: 9,
      categories: categoryIds,
    },
  });
  return response.data;
};
