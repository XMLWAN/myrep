import request from '@/utils/request'


export function fetchList(params){
  return request({
    url:'/api/patients',
    method:'get',
    params:params
  })
}



export function getSchedualPatient(params){
  return request({
    url:'/api/dialysis/patients',
    method:'get',
    params:params
  })
}


export function PatientInfo(params){
  return request({
    url:'/api/dialysis/info',
    method:'get',
    params:params
  })
}

export function doctorAndNurseList(params){
  return request({
    url:'/api/alldoctors',
    method:'get',
    params:params
  })
}


export function commitDailysisRecord(params){
  return request({
    url:'/api/dialysis/record',
    method:'post',
    params:params
  })
}

export function getGobelInfo(params){
  return request({
    url:'/api/dialysis/golbal',
    method:'post',
    params:params
  })
}


export function CreateDoctorAdvice(id,dialysisId,record_date,params){
  return request({
    url:'/api/dialysis/advice/create?id='+id+"&dialysis_id="+dialysisId+"&record_date="+record_date,
    method:'post',
    data:params
  })
}

export function getDoctorAdviceById(params){
  return request({
    url:'/api/dialysis/advice/get',
    method:'get',
    params:params
  })
}

export function editDoctorAdviceById(params){
  return request({
    url:'/api/dialysis/advice/edit',
    method:'put',
    params:params
  })
}


export function CreateMonitor(params){
  return request({
    url:'/api/dialysis/monitor/create',
    method:'post',
    params:params
  })
}

export function DelMonitor(params){
  return request({
    url:'/api/dialysis/monitor/del',
    method:'post',
    params:params
  })
}


export function GetAllZone(params){
  return request({
    url:'/api/dialysis/zone',
    method:'get',
    params:params
  })
}


export function PostStartRecordInfo(params){
  return request({
    url:'/api/dialysis/start',
    method:'post',
    params:params
  })
}

export function GetGlobalInfo(params){
  return request({
    url:'/api/dialysis/device',
    method:'get',
    params:params
  })
}

export function GetDeviceInfo(params){
  return request({
    url:'/api/dialysis/device',
    method:'get',
    params:params
  })
}


export function commitDailysisSolution(params){
  return request({
    url:'/api/dialysis/global',
    method:'get',
    params:params
  })
}


export function delMonitor(params){
  return request({
    url:'/api/dialysis/monitor/del',
    method:'post',
    params:params
  })
}


export function getDialysisRecord(params) {
  return request({
    url:'/api/dialysis/dialysisorder',
    method:'Get',
    params:params
  })
}





export function postPrescription(params) {
  return request({
    url:'/api/dialysis/prescription',
    method:'Post',
    params:params
  })
}



export function postSoulution(params) {
  return request({
    url:'/api/dialysis/soulution',
    method:'Post',
    params:params
  })
}


export function postDoubleCheck(params) {
  return request({
    url:'/api/dialysis/dobule',
    method:'Post',
    params:params
  })
}


export function postAccepts(params) {
  return request({
    url:'/api/dialysis/accepts',
    method:'Post',
    params:params
  })
}


export function postAssessmentBeforeDislysis(params) {
  return request({
    url:'/api/dialysis/assessmentbeforedislysis',
    method:'Post',
    params:params
  })
}

export function postTreatmentsummary(params) {
  return request({
    url: '/api/dialysis/treatmentsummary',
    method:'Post',
    params:params
  })
}




export function postAssessmentAfterDislysis(params, data) {
  return request({
    url:'/api/dialysis/assessmentafterdislysis',
    method:'Post',
    params:params,
    data:data
  })
}


export function postDelMonitorInfo(params) {
  return request({
    url:'/api/dialysis/monitor/del',
    method:'Post',
    params:params,
    data:data
  })
}











