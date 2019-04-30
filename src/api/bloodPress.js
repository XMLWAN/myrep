import request from '@/utils/request'

export function watchList(query) {
  return request({
    url: '/watch/list',
    method: 'get',
    params: query
  })
}
