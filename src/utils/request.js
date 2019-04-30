import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout
  withCredentials: true
})

// request interceptor
// service.interceptors.request.use(config => {
//   Do something before request is sent
//   if (store.getters.token) {
//     让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//     config.headers['X-Token'] = getToken()
//   }
//   return config
// }, error => {
//   Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    const res = response.data
    // console.log(res)
    if (res.state !== 1) {
      // console.log(res)
      if (res.code === 6002) {
        store.dispatch('FrontendLogout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FrontendLogout').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
        return Promise.reject('error')
      } else {
        return response
      }
    } else {
      return response
    }
  },
  error => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  })

export default service
