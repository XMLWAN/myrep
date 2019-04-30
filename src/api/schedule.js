import request from '@/utils/request'

export function getWeekPanels(t){
    return request({
        url:'/api/schedule/weekpanel?data='+t,
        method:'get',
    })
}

export function getSchedules(week){
    return request({
        url:'/api/schedule/schedules?weekTime=' + week,
        method:'get',
    })
}

export function getSchedulePatients(params){
    return request({
        url:'/api/schedule/patients',
        method:'get',
        params:params,
    })
}

export function CreateSchedule(id, schedule){
    return request({
        url:'/api/schedule/create?patient_id='+id,
        method:'Post',
        data:schedule,
    })
}

export function CancelSchedule(id) {
    return request({
        url:'/api/schedule/delete?id='+id,
        method:"Delete",
    });
}

export function ChangeSchedule(id, schedule){
    return request({
        url:'/api/schedule/change?id='+id,
        method:'Put',
        data:schedule,
    })
}

export function GetPatientSchedules(id) {
    return request({
        url:'/api/patients/schedules?id='+id,
        method:'Get',
    })
}

export function GetWeekSchedulePrintInitData(date) {
    return request({
        url: '/api/schedule/print/initdata',
        method: 'get',
        params: { date: date },
    })
}