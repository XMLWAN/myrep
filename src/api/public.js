import request from '@/utils/request'

export function GetServerTime(){
    return request({
        url:'/api/public/servertime',
        method:'get',
    })
}
