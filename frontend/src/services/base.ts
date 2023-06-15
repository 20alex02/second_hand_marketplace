import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
export const IMAGE_URL = `${BASE_URL}/api/images/`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
