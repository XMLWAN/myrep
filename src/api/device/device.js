import request from '@/utils/request'

export function getDeviceInitData() {
    return request({
        url: '/api/device/initdata',
        method: 'get',
    })
}

export function getDevices(device_type, zone) {
    const params = new Object()
    if (device_type !== undefined) {
        params.type = device_type
    }
    if (zone !== undefined) {
        params.zone = zone
    }
    return request({
        url: '/api/devices',
        method: 'get',
        params: params,
    })
}

export function getDeviceBaseInfo(id) {
    const params = {
        id: id,
    }
    return request({
        url: '/api/device/baseinfo',
        method: 'get',
        params: params,
    })
}

// 参数太多，要看着文档来
export function createDevice(params) {
    return request({
        url: '/api/device/create',
        method: 'post',
        params: params,
    })
}

// 参数太多，要看着文档来
export function modifyDeviceBaseInfo(params) {
    return request({
        url: '/api/device/modify',
        method: 'post',
        params: params,
    })
}

export function getZones() {
    return request({
        url: '/api/device/zones',
        method: 'get',
    })
}

export function createZone(name, zone_type) {
    const params = {
        name: name,
        type: zone_type,
    }
    return request({
        url: '/api/device/zone/create',
        method: 'post',
        params: params,
    })
}

export function modifyZone(id, name, zone_type) {
    const params = {
        id: id,
        name: name,
        type: zone_type,
    }
    return request({
        url: '/api/device/zone/modify',
        method: 'post',
        params: params,
    })
}

export function getGroups() {
    return request({
        url: '/api/device/groups',
        method: 'get',
    })
}

export function createGroup(name) {
    const params = {
        name: name,
    }
    return request({
        url: '/api/device/group/create',
        method: 'post',
        params: params,
    })
}

export function modifyGroup(id, name) {
    const params = {
        id: id,
        name: name,
    }
    return request({
        url: '/api/device/group/modify',
        method: 'post',
        params: params,
    })
}

export function getDeviceNumbers() {
    return request({
        url: '/api/device/numbers',
        method: 'get',
    })
}

export function createDeviceNumber(number, zone_id, group_id) {
    const params = {
        number: number,
        zone: zone_id,
        group: group_id,
    }
    return request({
        url: '/api/device/number/create',
        method: 'post',
        params: params,
    })
}

export function modifyDeviceNumber(id, number, zone_id, group_id) {
    const params = {
        id: id,
        number: number,
        zone: zone_id,
        group: group_id,
    }
    return request({
        url: '/api/device/number/modify',
        method: 'post',
        params: params,
    })
}

export function disableDevice(id) {
    const params = {
        id: id,
    }
    return request({
        url: '/api/device/disable',
        method: 'post',
        params: params,
    })
}

export function disableZone(id) {
    const params = {
        id: id,
    }
    return request({
        url: '/api/device/zone/disable',
        method: 'post',
        params: params,
    })
}

export function disableGroup(id) {
    const params = {
        id: id,
    }
    return request({
        url: '/api/device/group/disable',
        method: 'post',
        params: params,
    })
}

export function disableDeviceNumber(id) {
    const params = {
        id: id,
    }
    return request({
        url: '/api/device/number/disable',
        method: 'post',
        params: params,
    })
}
