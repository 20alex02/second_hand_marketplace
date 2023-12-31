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
  if (minPrice === undefined && maxPrice === undefined) {
    params = {
      pageNum: pageNum,
      perPage: 10,
      categories: categoryIds,
    };
  } else {
    params = {
      pageNum: pageNum,
      perPage: 10,
      categories: categoryIds,
      estimatedPriceFrom: minPrice ?? 0,
      estimatedPriceTo: maxPrice ?? 0,
    };
  }

  const response = await axiosInstance.get<AxiosResponse>('api/advertisement', {
    params: params,
  });
  return response.data;
};

export const getAdvert = async (advertId: string) => {
  const response = await axiosInstance.get<AxiosResponse>(
    `/api/advertisement/${advertId}`
  );
  return response.data;
};

export const getAllMe = async (
  token: string,
  pageNum: number,
  categoryIds: string[] | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined
) => {
  let params;
  if (minPrice === undefined && maxPrice === undefined) {
    params = {
      pageNum: pageNum,
      perPage: 10,
      categories: categoryIds,
    };
  } else {
    params = {
      pageNum: pageNum,
      perPage: 10,
      categories: categoryIds,
      estimatedPriceFrom: minPrice ?? 0,
      estimatedPriceTo: maxPrice ?? 0,
    };
  }
  const response = await axiosInstance.get<AxiosResponse>(
    '/api/advertisement/me',
    {
      headers: { authorization: `Bearer ${token}` },
      params: params,
    }
  );
  return response.data;
};

export const getAllMeAdmin = async (
  token: string,
  id: string,
  pageNum: number,
  categoryIds: string[] | undefined,
  minPrice: number | undefined,
  maxPrice: number | undefined
) => {
  let params;
  if (minPrice === undefined && maxPrice === undefined) {
    params = {
      pageNum: pageNum,
      perPage: 10,
      categories: categoryIds,
    };
  } else {
    params = {
      pageNum: pageNum,
      perPage: 10,
      categories: categoryIds,
      estimatedPriceFrom: minPrice ?? 0,
      estimatedPriceTo: maxPrice ?? 0,
    };
  }
  const response = await axiosInstance.get<AxiosResponse>(
    `/api/advertisement/admin/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
      params: params,
    }
  );
  return response.data;
};

export const createAdvert = async (token: string, data: FormData) => {
  const response = await axiosInstance.post<AxiosResponse>(
    '/api/advertisement',
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const deleteAdvert = async (data: { token: string; id: string }) => {
  const response = await axiosInstance.delete<AxiosResponse>(
    `/api/advertisement/${data.id}`,
    {
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    }
  );
  return response.data;
};

export const updateAdvert = async (
  token: string,
  id: string,
  data: FormData
) => {
  const response = await axiosInstance.patch<AxiosResponse>(
    `/api/advertisement/${id}`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const getParticipants = async (token: string, advertId: string) => {
  const response = await axiosInstance.get<AxiosResponse>(
    `/api/participant/${advertId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createParticipants = async (
  id: string,
  data: { phoneNumber?: string; email?: string },
  token?: string
) => {
  token = undefined;
  const response = await axiosInstance.post<AxiosResponse>(
    `/api/participant/${id}`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
