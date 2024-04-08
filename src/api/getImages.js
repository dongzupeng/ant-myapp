import request from '@/request/index';

export const getImageList = (params) => {
  return request({
    methods: 'get',
    url: '/api/getImages',
    params,
  });
};
