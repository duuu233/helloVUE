import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import md5 from 'js-md5'
// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_PAY, // api的base_url
  timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    //前端 通过时间 判断token是否过期
    let tokenTime = sessionStorage.getItem('tokenTime')
    let newTime = new Date().getTime()
    if (!tokenTime) {
      sessionStorage.setItem('tokenTime', newTime)
    } else {
      if (
        newTime - tokenTime >= 1800000 &&
        config.url.indexOf('login') === -1
      ) {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        sessionStorage.removeItem('tokenTime')
      } else {
        sessionStorage.setItem('tokenTime', newTime)
      }
    }
    //签名-------------s
    let randomString =
      new Date()
        .toLocaleDateString()
        .split('/')
        .join('') + Math.floor(Math.random() * 10).toString()
    if (randomString.length === 7) {
      randomString = randomString + Math.floor(Math.random() * 10).toString()
    }
    let sign = randomString + '8e808087-08b3-3e10-8e83-93bf078df4b2'
    sign = md5(sign)
    //签名-------------e
    if (config.method === 'get') {
      if (!config.params) {
        config.params = {}
      }
      config.params.randomString = randomString
      config.params.sign = sign

      if (getToken()) {
        config.params.userToken = getToken()
      }
    }
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {}
      }
      config.data.randomString = randomString
      config.data.sign = sign
      if (getToken()) {
        config.data.userToken = getToken()
      }
    }

    // if (store.getters.token) {
    //   config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.retCode !== 200) {
      Message({
        message: res.retMsg,
        type: 'error',
        duration: 3 * 1000
      })
      // 401:未登录;
      // if (res.retCode === 401) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      if (res.retCode === 406) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
