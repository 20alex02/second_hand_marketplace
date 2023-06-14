import axiosInstance from './base';
import { AxiosResponse } from 'axios';
import Qs from 'qs';

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
  axiosInstance.interceptors.request.use((config) => {
    config.paramsSerializer = (params) => {
      // Qs is not included in the Axios package
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };

    return config;
  });

  let params;
  if (minPrice === undefined || maxPrice === undefined) {
    params = {
      pageNum: pageNum,
      perPage: 1,
      categories: categoryIds,
    };
  } else {
    params = {
      pageNum: pageNum,
      perPage: 9,
      categories: categoryIds,
    };
  }

  const response = await axiosInstance.get<AxiosResponse>('api/advertisement', {
    params: params,
  });
  return response.data;
};
