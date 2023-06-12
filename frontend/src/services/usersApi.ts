import axiosInstance from './base';

export const getUsers = async (token: string) => {
  const response = await axiosInstance.get('api/user', {
    headers: { authorization: ` ${token}` },
  });
  return response.data;
};
