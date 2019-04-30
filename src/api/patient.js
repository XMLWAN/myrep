import request from '@/utils/request'

export function fetchList(params){
    return request({
        url:'/api/patients',
        method:'get',
        params:params
    })
}

export function fetchAllList(){
    return request({
        url:'/api/patients/all',
        method:'get',
    })
}
export function GetPatientTotal(){
    return request({
        url:'/api/patients/total',
        method:'get',
    })
}

export function generateDialysisNo() {
    return request({
        url:'/api/patients/generatedialysisno',
        method:'get'
    })
}

export function createPatient(patient) {
    return request({
        url:'/api/patients/create',
        method:'post',
        data:patient,
    })
}
export function editPatient(id,patient) {
    return request({
        url:'/api/patients/edit?id='+id,
        method:'put',
        data:patient,
    })
}
export function fetchPatient(id) {
    return request({
        url:'/api/patients/get?id='+id,
        method:'get',
    })
}


export function fetchPatientDialysisSolutions(params){
    return request({
        url:'/api/patients/dialysissolutions',
        method:'Get',
        params:params,
    })
}

export function createPatientDialysisSolution(id,solution){
    return request({
        url:'/api/patients/dialysissolution/create?patient='+id,
        method:'post',
        data:solution,
    })
}

export function editPatientDialysisSolution(patient, id,solution){
    return request({
        url:'/api/patients/dialysissolution/edit?patient='+patient + '&id='+id,
        method:'put',
        data:solution,
    })
}

export function createChildPatientDialysisSolution(id,solution){
    return request({
        url:'/api/patients/dialysissolution/child/create?patient='+id,
        method:'post',
        data:solution,
    })
}


export function editChildPatientDialysisSolution(patient, id, solution){
    return request({
        url:'/api/patients/dialysissolution/child/edit?patient='+patient + '&id='+id,
        method:'put',
        data:solution,
    })
}

export function editDialysisSolutionDetail(patient, id, solution){
    return request({
        url:'/api/patients/dialysissolution/detail/edit?patient='+patient + '&id='+id,
        method:'put',
        data:solution,
    })
}


export function deleteDialysisSolution(id){
    return request({
        url:'/api/patients/dialysissolution/delete?id='+id,
        method:'delete',
    })
}

export function createDryWeight(patient, weight){
    return request({
        url:'/api/patients/dryweight/create?id='+patient,
        method:'post',
        data:weight,
    })
}

export function getDryWeights(params){
    return request({
        url:'/api/patients/dryweight/get',
        method:'get',
        params:params
    })
}

export function getPatientDialysisRecords(params) {
    return request({
        url:'/api/patients/dialysisrecords',
        method:'get',
        params:params
    })
}
export function getPatientProEducation(params) {
    return request({
        url:'/api/patients/proeducation',
        method:'get',
        params:params
    })
}

export function getCourseOfDiseaseRecords(patient_id, start_time_ymd, end_time_ymd) {
    var params = {
        patient_id: patient_id,
        start_time: start_time_ymd,
        end_time: end_time_ymd,
    }
    return request({
        url: '/api/patient/courses',
        method: 'get',
        params: params,
    })
}

export function createCourseOfDiseaseRecord(patient_id, content) {
    var params = {
        patient_id: patient_id,
        content: content,
    }
    return request({
        url: '/api/patient/course/create',
        method: 'post',
        params: params,
    })
}

export function getRescueRecords(patient_id, start_time_ymd, end_time_ymd) {
    var params = {
        patient_id: patient_id,
        start_time: start_time_ymd,
        end_time: end_time_ymd,
    }
    return request({
        url: '/api/patient/rescues',
        method: 'get',
        params: params,
    })
}

export function createRescueRecord(patient_id, content) {
    var params = {
        patient_id: patient_id,
        content: content,
    }
    return request({
        url: '/api/patient/rescue/create',
        method: 'post',
        params: params,
    })
}

export function deleteCourseOfDiseaseRecords(patient_id, ids_str) {
    var params = {
        patient_id: patient_id,
        ids: ids_str,
    }
    return request({
        url: '/api/patient/course/delete',
        method: 'post',
        params: params,
    })
}

export function deleteRescueRecords(patient_id, ids_str) {
    var params = {
        patient_id: patient_id,
        ids: ids_str,
    }
    return request({
        url: '/api/patient/rescue/delete',
        method: 'post',
        params: params,
    })
}

export function EditLapseto(patient_id, data) {
    return request({
        url: '/api/patients/lapseto/edit?id='+patient_id,
        method: 'post',
        data: data,
    })
    
}





export function PostSearch(keyword) {
  return request({
    url: '/api/patients/search?keyword='+keyword,
    method: 'post',

  })

}

