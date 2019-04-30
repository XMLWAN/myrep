import request from '@/utils/request'

export function getDialysisRecordInitData(){
    return request({
        url:'/api/dialysis/initdata',
        method:'get',
    })
}

export function getDialysisSchedules(ymd){
    var params = {
        date: ymd,
    }
    return request({
        url:'/api/dialysis/schedules',
        method:'get',
        params: params,
    })
}

export function getDialysisScheduleDetail(patient_id, ymd){
    var params = {
        patient_id: patient_id,
        date: ymd,
    }
    return request({
        url:'/api/dislysis/schedule',
        method:'get',
        params: params,
    })
}

export function editMonitor(patient_id, schedule_date, data){
    var params = {
        patient_id: patient_id,
        schedule_date: schedule_date,
    }
    return request({
        url:'/api/dislysis/monitor/edit',
        method:'post',
        params: params,
        data: data,
    })
}

export function startDialysis(patient_id, schedule_date, nurse_id, bed_id) {
    var params = {
        patient_id: patient_id,
        date: schedule_date,
        nurse: nurse_id,
        bed: bed_id,
    }
    return request({
        url:'/api/dialysis/start_record',
        method:'post',
        params: params,
    })
}

export function finishDialysis(patient_id, schedule_date, nurse_id){
    var params = {
        patient_id: patient_id,
        date: schedule_date,
        nurse: nurse_id,
    }
    return request({
        url:'/api/dialysis/finish',
        method:'post',
        params: params,
    })
}



export function postDelMonitorInfo(params) {
  return request({
    url:'/api/dialysis/monitor/del',
    method:'post',
    params:params,
  })
}





