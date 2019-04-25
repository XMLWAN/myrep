import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSpinner: false })// NProgress Configuration

const loginWhiteList = ['/token/verify', '/401', '/404'] // 登录验证白名单
const permissionWhiteList = loginWhiteList.concat(['/']) // 权限验证白名单

router.beforeEach((to, from, next) => {
  // 线上注释
  // if (!store.getters.configlist || store.getters.configlist === undefined || store.getters.configlist.length <= 0) {
  //   store.dispatch('VerifyConfigList', []).then(() => {
  //   next()
  //   })
  // }
  // if (store.getters.permission_routers === undefined) {
  //   store.dispatch('xt_GenerateRoutes', []).then(() => {
  //     next()
  //   })
  // } else {
  //   next()
  // }
  // return
  // 线上注释

  NProgress.start()
  // console.log(store.getters.current_role_urls.indexOf(to.path))
  // alert('path:' + to.path)
  // 如果 url 带有 lt (login_token)参数，则跳转到验证 token 时等待的页面
  if (to.query.lt != null && to.query.lt.length > 0) {
    // alert('will go to verify token: ' + to.query.lt)
    next({ path: '/token/verify', query: { token: to.query.lt }})

    // 否则 如果没有 user 信息，则前往 sso 登录
  } else if (store.getters.xt_user.user.id === 0) {
    if (loginWhiteList.indexOf(to.path) !== -1) {
      // alert('登录白名单内，跳过登录')
      next()
    } else {
      // alert('前往登录')
      window.location.href = process.env.BASE_API + '/login' // sso 地址
    }

    // 否则 如果当前 url 不需要验证访问权限，则通过
  } else if (permissionWhiteList.indexOf(to.path) !== -1) {
    // alert('权限验证白名单内，直接进入')
    next()

    // 否则 如果拥有当前 url 的权限，则通过
  // } else if (store.getters.current_role_urls.indexOf(to.path) !== -1) {
  //   // alert('权限验证通过')
  //   next()

    // 否则 跳转401 (未经授权)
  } else {
    // console.log(store.getters.current_role_urls)
    // console.log(store.getters.current_role_urls.indexOf(to.path))
    // alert('401')
    next()
    // next({ path: '/404' })
  }
})

router.afterEach(() => {
  NProgress.done()
})
