import axiosInstance from './base';

export const getUsers = async (token: string) => {
  const response = await axiosInstance.get('api/user', {
    params: {
      pageNum: 1,
      perPage: 10,
    },
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};
