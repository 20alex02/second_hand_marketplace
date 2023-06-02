import { LoginData, authTokenResponse } from '../models/login';
import axiosInstance from './base';

export const loginUserFn = async (user: LoginData) => {
  const response = await axiosInstance.post<authTokenResponse>(
    'api/secret',
    user
  );
  return response.data;
};
