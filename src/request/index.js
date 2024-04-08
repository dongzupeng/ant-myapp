import { getCache } from '@/utils/tokenStorage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.apiopen.top', // 设置你的API基本URL
  timeout: 5000, // 设置超时时间
});
// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.data) {
      config.data = {};
    }
    const token = getCache('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
