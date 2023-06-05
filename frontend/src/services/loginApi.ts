import {
  LoginData,
  RegisterData,
  authTokenResponse,
  registerResponse,
} from '../models/login';
import axiosInstance from './base';

export const loginUserFn = async (user: LoginData) => {
  const response = await axiosInstance.post<authTokenResponse>(
    'api/secret',
    user
  );
  return response.data;
};

export const registerUserFn = async (user: RegisterData) => {
  const response = await axiosInstance.post<registerResponse>('api/user', user);
  return response.data;
};
