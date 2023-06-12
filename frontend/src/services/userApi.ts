import { AxiosResponse } from 'axios';
import { EditData, MyDataResponse } from '../models/edit';
import axiosInstance from './base';

export const getMyData = async (token: string) => {
  const response = await axiosInstance.get<MyDataResponse>('api/user/me', {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editMyData = async (token: string, data: EditData) => {
  const response = await axiosInstance.patch<AxiosResponse>('api/user/', data, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};
