import request from '@/utils/request';

export function fetchSignPatients(params){
    return request({
        url:'/api/sign/patients',
        method:'get',
        params:params,
    })
}

export function getPatientSign(params){
    return request({
        url:'/api/sign/patientsign',
        method:'get',
        params:params,
    })
}

export function SignWeigh(params, data) {
    return request({
        url:'/api/signweign',
        params: params,
        data: data,
        method:"Post",
    })
}