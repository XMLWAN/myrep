import request from '@/utils/request'

export function fetchAllDoctorAndNurse(){
    return request({
        url:'/api/alldoctors',
        method:'get',
    })
}
export function fetchAllAdminUsers(){
    return request({
        url:'/api/admin/users',
        method:'get',
    })
}