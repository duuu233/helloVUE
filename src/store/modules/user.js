import {
  login,
  logout,
  getInfo,
  getSysMenus,
  getKeyValues,
  getChildAppCodes
} from '@/api/login'
import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      // permissions.forEach((v, i) => {
      //   if (state.permissions.includes(v)) return
      //   state.permissions.push(v);
      // });
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            // const data = response.data
            // const tokenStr = data.tokenHead+data.token
            const data = response.retData

            const tokenStr = data.adminToken
            setToken(tokenStr)
            commit('SET_TOKEN', tokenStr)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取顶部菜单栏数据
    GetSysMenus({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getSysMenus(params)
          .then(response => {
            // 获取通用字典
            getKeyValues().then(res => {
              if (res.retCode === 200) {
                sessionStorage.setItem(
                  'allKeyValues',
                  JSON.stringify(res.retData)
                )
              }
            })
            getChildAppCodes().then(res => {
              if (res.retCode === 200) {
                commit('SET_PERMISSIONS', res.retData)
                resolve(response)
              } else {
                Message({
                  type: 'error',
                  message: '获取用户权限失败',
                  duration: 2000
                })
                resolve(response)
              }
            })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    // GetInfo({
    //   commit,
    //   state
    // }, id) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(id).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.username)
    //       commit('SET_AVATAR', data.icon)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
