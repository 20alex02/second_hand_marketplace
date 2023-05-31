import { authTokenResponse } from '../models/authTokenResponse';
import axiosInstance from './base';

export const login = async (
  email: string,
  password: string
): Promise<authTokenResponse> => {
  const response = await axiosInstance.post(`/login`, {
    email: email,
    password: password,
  });
  return response.data;
};
