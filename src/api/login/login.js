import request from '@/utils/request'

export function verifyToken(token) {
  return request({
    url: '/api/token/verify',
    method: 'post',
    params: {
      'token': token
    }
  })
}

export function modifyAdminInfo(params) {
  return request({
    url: '/api/admin/edit_info',
    method: 'post',
    params: params,
  })
}

export function getModifyPwdCode() {
  return request({
    url: '/api/password/code',
    method: 'post',
  })
}

export function modifyPassword(new_pwd, code) {
  var params = {
    password: new_pwd,
    code: code,
  }
  return request({
    url: '/api/password/modify',
    method: 'post',
    params: params,
  })
}