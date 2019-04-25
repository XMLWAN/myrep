import { getConfigList } from '@/api/datastore'
import { getDataConfigList, setDataConfigList } from '@/utils/data_config' // getConfigList from sessionStorage

const data = {
  state: {
    configlist: ''
  },

  mutations: {
    SET_CONFIGLIST: (state, configlist) => {
      state.configlist = configlist
    }
  },

  actions: {
    VerifyConfigList({ commit, state }) {
      return new Promise((resolve, reject) => {
        var configlist = getDataConfigList()
        // console.log('configLIST数据：', configlist)
        if (configlist != null && configlist.length > 0) {
          var infoJSON = JSON.parse(configlist)
          // console.log('configLISt数据：', infoJSON)
          commit('SET_CONFIGLIST', infoJSON)
          resolve()
        } else {
            getConfigList().then(response => {
              if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                reject('error')
              }
              const list = response.data.data
              // console.log('请求返回的数据：', list)
              if (list) { // 验证返回的configlist是否是一个非空数组
                // console.log('转换的configlist为：', list.configlist)
                console.log('转换的configlist为：', list.configlist)
                commit('SET_CONFIGLIST', list.configlist)
                setDataConfigList(JSON.stringify(list.configlist))
                resolve()
              } else {
                reject('getInfo: configlist must be a non-null array !')
              }
            }).catch(error => {
              reject(error)
            })
        }
      })
    },
    updateConfigList({ commit }, configArr) {
      var oldconfiglist = getDataConfigList()
      var infoJSON = JSON.parse(oldconfiglist)
      return new Promise((resolve, reject) => {
        var module = configArr.module
        if (infoJSON[module] === undefined) {
          infoJSON[module] = []
        }
        infoJSON[module].push(configArr)
        commit('SET_CONFIGLIST', infoJSON)
        setDataConfigList(JSON.stringify(infoJSON))
        resolve()
      })
    },
    updateChildConfigList({ commit }, param) {
      var configArr = param[0]
      var state = param[1]
      var oldconfiglist = getDataConfigList()
      var infoJSON = JSON.parse(oldconfiglist)
      return new Promise((resolve, reject) => {
        var module = configArr.module
        var parentConfig = infoJSON[module]
        var parent_id = configArr.parent_id
        for (var i = 0; i < parentConfig.length; i++) {
          var newconfig = parentConfig[i]
          if (parent_id === newconfig.id) {
            if (state === 'create') {
              if (infoJSON[module][i]['childs'] === null) {
                infoJSON[module][i]['childs'] = []
              }
              infoJSON[module][i]['childs'].unshift(configArr)
              break
            } else {
              for (var j = 0; j < newconfig['childs'].length; j++) {
                var newchildconfig = newconfig['childs'][j]
                if (newchildconfig.org_id === 0 && newchildconfig.id === configArr.delete_id_system && configArr.status === 1) {
                  infoJSON[module][i]['childs'][j] = configArr
                  break
                }
                if (newchildconfig.id === configArr.id) {
                  if (state === 'update') {
                    infoJSON[module][i]['childs'][j] = configArr
                  } else if (state === 'delete') {
                    infoJSON[module][i]['childs'].splice(j, 1)
                  }
                  break
                }
              }
            }
            break
          }
        }
        commit('SET_CONFIGLIST', infoJSON)
        setDataConfigList(JSON.stringify(infoJSON))
        resolve()
      })
    },
    updateParentConfigList({ commit }, param) {
      var configArr = param[0]
      var state = param[1]
      var oldconfiglist = getDataConfigList()
      var infoJSON = JSON.parse(oldconfiglist)
      return new Promise((resolve, reject) => {
        var module = configArr.module
        if (infoJSON[module] === undefined) {
          infoJSON[module] = []
        }
        if (state === 'create') {
          infoJSON[module].push(configArr)
        } else {
          for (var i = 0; i < infoJSON[module].length; i++) {
            var parentConfig = infoJSON[module][i]
            if (parentConfig.org_id === 0 && parentConfig.id === configArr.delete_id_system && configArr.status === 1) {
              infoJSON[module][i] = configArr
              break
            }

            if (parentConfig.id === configArr.id) {
              if (state === 'update') {
                infoJSON[module][i] = configArr
                break
              } else if (state === 'delete') {
                infoJSON[module].splice(i, 1)
                break
              }
            }
          }
        }
        commit('SET_CONFIGLIST', infoJSON)
        setDataConfigList(JSON.stringify(infoJSON))
        resolve()
      })
    }
  }
}

export default data
