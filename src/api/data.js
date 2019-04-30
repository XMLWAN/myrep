import request from '@/utils/request'

export function createConfig(params) {
  return request({
    url: '/api/createconfig',
    method: 'post',
    data: params
  })
}

export function createChildConfig(params) {
  return request({
    url: '/api/createchildconfig',
    method: 'post',
    data: params
  })
}

export function updateChildConfig(params) {
  return request({
    url: '/api/updatechildconfig',
    method: 'post',
    data: params
  })
}

export function deleteChildConfig(params) {
  return request({
    url: '/api/deletechildconfig',
    method: 'post',
    data: params
  })
}

export function updateTemplate(params) {
  return request({
    url: '/api/updatetemplate',
    method: 'post',
    data: params
  })
}
