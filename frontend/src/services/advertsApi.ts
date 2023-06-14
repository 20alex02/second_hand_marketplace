import axiosInstance from './base';
import { AxiosResponse } from 'axios';

export const getCategories = async () => {
  const response = await axiosInstance.get<AxiosResponse>('api/category');
  return response.data;
};

export const getAdverts = async (
  pageNum: number,
  categoryIds: string[] | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined
) => {
  let params;
  if (minPrice === undefined || maxPrice === undefined) {
    params = {
      pageNum: pageNum,
      perPage: 9,
      categories: categoryIds,
    };
  } else {
    params = {
      pageNum: pageNum,
      perPage: 9,
      categories: categoryIds,
      estimatedPriceFrom: minPrice,
      estimatedPriceTo: maxPrice,
    };
  }

  const response = await axiosInstance.get<AxiosResponse>('api/advertisement', {
    params: params,
  });
  return response.data;
};

export const getAllMe = async (
  token: string,
  pageNum: number,
  categoryIds: string[] | undefined
) => {
  const response = await axiosInstance.get<AxiosResponse>(
    '/api/advertisement/me',
    {
      headers: { authorization: `Bearer ${token}` },
      params: {
        pageNum: pageNum,
        perPage: 9,
        categories: categoryIds,
      },
    }
  );
  return response.data;
};

export const getAllMeAdmin = async (
  token: string,
  id: string,
  pageNum: number,
  categoryIds: string[] | undefined
) => {
  const response = await axiosInstance.get<AxiosResponse>(
    `/api/advertisement/admin/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
      params: {
        pageNum: pageNum,
        perPage: 9,
        categories: categoryIds,
      },
    }
  );
  return response.data;
};
