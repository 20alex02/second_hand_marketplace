import { authTokenResponse } from '../models/login';
import axiosInstance from './base';

export const getMyData = async (token: string) => {
  const response = await axiosInstance.get('api/user:id', {
    headers: { authentication: `Bearer ${token}` },
  });
  return response.data;
};

export const editMydata = async (token: string) => {
  const response = await axiosInstance.patch<authTokenResponse>('api/user', {
    headers: { authentication: `Bearer ${token}` },
  });
  return response.data;
};
