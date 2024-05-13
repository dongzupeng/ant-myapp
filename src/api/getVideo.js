import request from '@/request/index';

export const getVideoList = (params) => {
  return request({
    methods: 'get',
    url: '/api/getHaoKanVideo',
    params,
  });
};
