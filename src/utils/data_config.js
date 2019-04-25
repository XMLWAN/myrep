const dataConfigKey = 'data_config_list'

export function getDataConfigList() {
  return window.sessionStorage.getItem(dataConfigKey)
}

export function setDataConfigList(infoJSONStr) {
  window.sessionStorage.setItem(dataConfigKey, infoJSONStr)
}

export function removeDataConfigList() {
  window.sessionStorage.removeItem(dataConfigKey)
}
