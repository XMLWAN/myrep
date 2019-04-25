import store from '@/store'

export function getDataConfig(module, field) {
  var storeConfigList = store.getters.configlist
  var moduleConfig = storeConfigList[module]
  if (module === 'summary' || module === 'education') {
    var Aresult = []
    for (var j = 0; j < moduleConfig.length; j++) {
      var Atemp = []
      var Aconfig = moduleConfig[j]
      Atemp['id'] = Aconfig.value
      Atemp['value'] = Aconfig.content
      Atemp['text'] = Aconfig.title
      Aresult.push(Atemp)
    }
    return Aresult
  } else {
    for (var i = 0; i < moduleConfig.length; i++) {
      var newConfig = moduleConfig[i]
      if (newConfig.field_name === field) {
        var result = []
        for (var j = 0; j < newConfig.childs.length; j++) {
          var tempconfig = newConfig.childs[j]
          var temp = []
          temp['id'] = tempconfig.value
          temp['name'] = tempconfig.name
          result.push(temp)
        }
        return result
      }
    }
  }
}
