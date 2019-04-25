import request from '@/utils/request'

export function adminMainView() {
    return request({
        url: '/api/adminmain',
        method: 'get',
    })
}

export function getAdmins(page) {
    const params = {
        page: page,
    }
    return request({
        url: '/api/admins',
        method: 'get',
        params: params,
    })
}

export function getAddAdminInitData() {
    return request({
        url: '/api/admin/addinit',
        method: 'get',
    })
}

export function addAdmin(mobile, name, type, title, role, intro) {
    const params = {
        mobile: mobile,
        name: name, 
        type: type, 
        title: title, 
        role: role, 
        intro: intro,
    }
    return request({
        url: '/api/admin/add',
        method: 'post',
        params: params,
    })
}

export function getModifyAdminInitData(uid) {
    const params = {
        uid: uid,
    }
    return request({
        url: '/api/admin/editinit',
        method: 'get',
        params: params,
    })
}

export function modifyAdmin(uid, name, type, title, role, intro) {
    const params = {
        uid: uid,
        name: name, 
        type: type, 
        title: title, 
        role: role, 
        intro: intro,
    }
    return request({
        url: '/api/admin/edit',
        method: 'post',
        params: params,
    })
}

export function setAdminStatus(uid, enable) {
    const params = {
        uid: uid,
        enable: enable,
    }
    return request({
        url: '/api/admin/setstatus',
        method: 'post',
        params: params,
    })
}

export function getSpecialPermissionInitData() {
    return request({
        url: '/api/admin/specialpermission/initdata',
        method: 'get',
    })
}

export function submitDialysisRecordPermissionUsers(ids_str) {
    const params = {
        ids: ids_str,
    }
    return request({
        url: '/api/admin/specialpermission/dialysisrecord/submit',
        method: 'post',
        params: params,
    })
}