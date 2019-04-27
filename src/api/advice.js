import request from '@/utils/request'

export function getAdviceConfig(){
    return request({
        url:'/api/getadviceconfigs',
        method:'get',
    })
}


export function CreateDoctorAdvice(id, advice){
    return request({
        url:'/api/patients/advice/create?id='+id,
        method:'post',
        data:advice,
    })
}


export function EditDoctorAdvice(patient, id, advice){
    return request({
        url:'/api/patients/advice/edit?id='+id + "&patient=" + patient,
        method:'Put',
        data:advice,
    })
}


export function ExecDoctorAdvice(patient, id, time){
    var params = {
        id:id,
        patient:patient,
        execution_time: time,
    }
    return request({
        url:'/api/patients/advice/exec',
        method:'Post',
        params:params,
    })
}
export function CheckDoctorAdvice(patient, id){
    var params = {
        id:id,
        patient:patient,
        // execution_time: time,
    }
    return request({
        url:'/api/patients/advice/check',
        method:'Post',
        params:params,
    })
}
export function CheckGroupAdvice(groupno){
    var params = {
        groupno:groupno,
    }
    return request({
        url:'/api/patients/advice/checkgroup',
        method:'Post',
        params:params,
    })
}


export function getDoctorAdviceList(params){
    return request({
        url:'/api/patients/advices',
        method:'Get',
        params:params,
    })
}


export function StopDoctorAdvice(id, reason){
    return request({
        url:'/api/patients/advice/stop?id='+id,
        method:'Post',
        data:reason,
    })
}

export function StopGroupAdvice(groupno, reason){
    return request({
        url:'/api/patients/advice/stopgroup?groupno='+groupno,
        method:'Post',
        data:reason,
    })
}

export function ExecGroupAdvice(groupno, time){
    return request({
        url:'/api/patients/advice/execgroup?groupno='+groupno +'&execution_time='+time,
        method:'Post',
    })
}

export function DeleteDoctorAdvice(id){
    return request({
        url:'/api/patients/advice/delete?id='+id,
        method:'Delete',
    })
}

export function CreateDrugDic(data){
    return request({
        url:'/api/drugdic/create',
        method:'post',
        data:data,
    })
}
export function UpdateDrugDic(id, data){
    return request({
        url:'/api/drugdic/update?id=' + id,
        method:'put',
        data:data,
    })
}
export function DeleteDrugDic(id){
    return request({
        url:'/api/drugdic/delete?id=' + id,
        method:'delete',
    })
}

export function CreateDrugWay(data){
    return request({
        url:'/api/drugway/create',
        method:'post',
        data:data,
    })
}

export function UpdateDrugWay(id, data){
    return request({
        url:'/api/drugway/update?id=' + id,
        method:'put',
        data:data,
    })
}
export function DeleteDrugWay(id){
    return request({
        url:'/api/drugway/delete?id=' + id,
        method:'delete',
    })
}

export function CreateExecutionFrequency(data){
    return request({
        url:'/api/executionfrequency/create',
        method:'post',
        data:data,
    })
}

export function UpdateExecutionFrequency(id, data){
    return request({
        url:'/api/executionfrequency/update?id=' + id,
        method:'put',
        data:data,
    })
}
export function DeleteExecutionFrequency(id){
    return request({
        url:'/api/executionfrequency/delete?id=' + id,
        method:'delete',
    })
}
export function CreateAdviceTemplate(data){
    return request({
        url:'/api/advicetemplate/create',
        method:'post',
        data:data,
    })
}

export function UpdateAdviceTemplate(id, data){
    return request({
        url:'/api/advicetemplate/update?id=' + id,
        method:'put',
        data:data,
    })
}
export function DeleteAdviceTemplate(id,template_id,parent_id){
    return request({
        url:'/api/advicetemplate/delete?id=' + id+"&template_id="+template_id+"&parent_id="+parent_id,
        method:'delete',
    })
}


export function postAdviceTemplate(params,name){
  return request({
    url:'/api/advicetemplate/create?template_name='+name,
    method:'post',
    data:params
  })
}

export function CreateGroupAdvice(id, groupno, advices){
  return request({
      url:'/api/patients/advice/creategroup?id='+id + '&groupno=' + groupno,
      method:'post',
      data:advices,
  })
}
export function DeleteGroupAdvice(groupno){
  return request({
      url:'/api/patients/advice/deletegroup?groupno='+groupno,
      method:'delete',
  })
}



export function getAllAdviceTemplate(){
  return request({
    url:'/api/advicetemplate/list',
    method:'get',
  })
}


export function CreateSingleAdviceTemplate(advices){
  return request({
    url:'/api/advicetemplate/add',
    method:'post',
    params:advices,

  })
}
export function DeleteParentAdviceTemplate(id){
  return request({
    url:'/api/adviceparenttemplate/delete?template_id='+id,
    method:'delete',

  })
}

export function CreateSubAdvice(params){
  return request({
    url:'/api/subadvice/create',
    method:'post',
    params:params,
  })
}


export function updateTemplateName(params) {
  return request({
    url: '/api/template/modify',
    method: 'post',
    params: params
  })
}







