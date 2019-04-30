import request from '@/utils/request'

export function getConfigList(params) {
  return request({
    url: '/api/getconfiglist',
    method: 'get',
    data: params
  })
}
