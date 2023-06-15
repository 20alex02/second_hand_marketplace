import axiosInstance from './base';
import { AxiosResponse } from 'axios';

export const createCategory = async (
  token: string,
  categoryName: string,
  categoryParent?: string
) => {
  const response = await axiosInstance.post<AxiosResponse>(
    'api/category',
    { name: categoryName, parentId: categoryParent },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const deleteCategory = async (token: string, categoryId: string) => {
  const response = await axiosInstance.delete<AxiosResponse>(
    `api/category/${categoryId}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
