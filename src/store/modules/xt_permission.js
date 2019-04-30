import { xt_constantRouterMap, xt_asyncRouterMap } from '@/router'

const xt_permission = {
  state: {
    routers: xt_constantRouterMap,
    addRouters: []
  },
  mutations: {
    XT_SET_ROUTERS: (state, payload) => {
      state.routers = payload.concatRouters
      state.addRouters = payload.addRouters
    }
  },
  actions: {
    xt_GenerateRoutes({ commit }, urls) {
      return new Promise(resolve => {
        setupRouters(urls)
        var addRouters = xt_filterAsyncRouter(xt_asyncRouterMap)
        commit('XT_SET_ROUTERS', { concatRouters:xt_constantRouterMap.concat(xt_asyncRouterMap), addRouters:addRouters })
        resolve()
      })
    }
  }
}

function xt_filterAsyncRouter(routers) {
  var addRouters = routers.filter(route => {
    if (route.is_menu == false) {
      return true
    }
    if (route.hidden == false) {
      if (route.children && route.children.length) {
        route.children = xt_filterAsyncRouter(route.children)
      }
      return true
    }
    return false
  })
  return addRouters
}

function setupRouters(urls) {
  // console.log(urls)
  xt_asyncRouterMap.forEach(router => {
    // console.log(router.path)
    if (Object.prototype.toString.call(router.children) === '[object Array]') {
      router.hidden = true
      router.children.forEach(c_router => {
        // console.log(c_router.path)
        if (IndexOf(urls, c_router.path) !== -1) {
        // if (urls.indexOf(c_router.path) !== -1) {
          // console.log('router.children show : ' + c_router.path)
          router.hidden = false
          c_router.hidden = false
        } else {
          // console.log('router.children hide : ' + c_router.path)
          c_router.hidden = true
        }
      })
    } else {
      router.hidden = true
      if (IndexOf(urls, router.path) !== -1) {
        // console.log('router show : ' + router.path)
      // if (urls.indexOf(router.path) !== -1) {
        router.hidden = false
      }
    }
  })
}

function IndexOf(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      return i
    }
  }
  return -1
}

export default xt_permission
