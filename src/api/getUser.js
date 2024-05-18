import request from '@/request/index';

export const getUserInfo = (params) => {
  return request({
    methods: 'get',
    url: '/api/user-info',
    params,
  });
};
