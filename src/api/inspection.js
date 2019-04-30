import request from '@/utils/request'

export function fetchInspectionReference(id){
    return request({
        url:'/api/patient/inspection/reference?patient='+id,
        method:'get',
    })
}

export function CreatePatientInspection(id, data){
    return request({
        url:'/api/patient/inspection/create?patient='+id,
        method:'post',
        data:data,
    })
}

export function EditPatientInspection(id, data){
    return request({
        url:'/api/patient/inspection/edit?patient='+id,
        method:'put',
        data:data,
    })
}

export function DeletePatientInspection(params){
    return request({
        url:'/api/patient/inspection/delete',
        method:'delete',
        params:params,
    })
}

export function fetchPatientInspections(params){
    return request({
        url:'/api/patient/inspection/list',
        method:'get',
        params:params,
    })
}