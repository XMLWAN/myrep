import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
// import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import xt_user from './modules/xt_user'
import xt_permission from './modules/xt_permission'
import xt_role_temps from './modules/role_temps'
import global_config from './modules/globalConfig'

import getters from './getters'
import data from './modules/data'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    // permission,
    tagsView,
    user,
    xt_user,
    data,
    xt_permission,
    xt_role_temps,
    global_config
  },
  getters
})

// store.dispatch("InitAdminUserInfo")

export default store
