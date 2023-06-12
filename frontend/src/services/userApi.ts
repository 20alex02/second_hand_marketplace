import { AxiosResponse } from 'axios';
import { EditData } from '../models/edit';
import axiosInstance from './base';

export const getMyData = async (token: string) => {
  const response = await axiosInstance.get('api/user:id', {
    headers: { authentication: `Bearer ${token}` },
  });
  return response.data;
};

export const editMyData = async (token: string, data: EditData) => {
  const response = await axiosInstance.patch<AxiosResponse>('api/user/', data, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};
