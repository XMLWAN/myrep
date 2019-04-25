import request from '@/utils/request'

export function getTemplateInitData() {
  return request({
    url: '/api/schtemp/p/initdata',
    method: 'get',
  })
}

export function setTemplateMode(mode) {
  var params = {
    mode: mode,
  }
  return request({
    url: '/api/schtemp/p/setmode',
    method: 'post',
    params: params,
  })
}

export function updateSchedules(template_id, add_schs, del_schs, change_schs) {
  var params = {
    template_id: template_id,
    add_schs: add_schs,
    del_schs: del_schs,
    change_schs: change_schs,
  }
  return request({
    url: '/api/schtemp/p/update_sch',
    method: 'post',
    params: params,
  })
}