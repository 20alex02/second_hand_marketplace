import { AxiosResponse } from 'axios';
import axiosInstance from './base';
import { EditData } from '../models/edit';

export const getUsers = async (token: string) => {
  const response = await axiosInstance.get('api/user', {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const makeAdmin = async (token: string, id: string) => {
  const response = await axiosInstance.patch<AxiosResponse>(
    'api/user/' + id,
    null,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const editMyData = async (token: string, data: EditData) => {
  const response = await axiosInstance.patch<AxiosResponse>('api/user/', data, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};
