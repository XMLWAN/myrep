import request from '@/utils/request'

export function getRoles(page) {
    const params = {
        page: page,
    }
    return request({
        url: '/api/roles',
        method: 'get',
        params: params,
    })
}

export function addRole(name, intro) {
    const params = {
        name: name,
        intro: intro
    }
    return request({
        url: '/api/role/create',
        method: 'post',
        params: params,
    })
}

export function modifyRole(role_id, name, intro) {
    const params = {
        role_id: role_id,
        name: name,
        intro: intro
    }
    return request({
        url: '/api/role/modify',
        method: 'post',
        params: params,
    })
}

export function setRoleStatus(role_id, enable) {
    const params = {
        role_id: role_id,
        enable: enable,
    }
    return request({
        url: '/api/role/setstatus',
        method: 'post',
        params: params,
    })
}

export function getEditPurviewInitData(role_id) {
    const params = {
        role_id: role_id,
    }
    return request({
        url: '/role/purview/editinit',
        method: 'get',
        params: params,
    })
}

export function editPurview(role_id, purview_ids) {
    const params = {
        role_id: role_id,
        purview_ids: purview_ids,
    }
    return request({
        url: '/role/purview/edit',
        method: 'post',
        params: params,
    })
}