import request from '@/utils/request'

export function fetchStatistics(){
    return request({
        url:'/api/statistisc/index',
        method:'get',
      })
}