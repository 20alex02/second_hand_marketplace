import { AxiosResponse } from 'axios';
import axiosInstance from './base';

export const getUsers = async (token: string) => {
  const response = await axiosInstance.get('api/user', {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const makeAdmin = async (token: string, id: string) => {
  const response = await axiosInstance.patch<AxiosResponse>('api/user', {
    params: {
      id: id,
      role: 'ADMIN',
    },
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};
