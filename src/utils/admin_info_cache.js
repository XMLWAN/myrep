const userInfoKey = "admin_user_info"

export function getAdminUserInfoCache() {
    return window.sessionStorage.getItem(userInfoKey)
}

export function cacheAdminUserInfo(infoJSONStr) {
    window.sessionStorage.setItem(userInfoKey, infoJSONStr)
}

export function removeAdminUserInfoCache() {
    window.sessionStorage.removeItem(userInfoKey)
}