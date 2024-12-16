import store from '@/store'
import {
  getCookie
} from "@/utils/support";

function checkPermission(el, binding) {
  const {
    value
  } = binding
  const roles = store.getters && store.getters.permissions
  if (value && value instanceof Array) {
    if (getCookie('isSysAdmin') === '1') return
    if (value.length > 0) {
      // const permissionRoles = value
      // const hasPermission = roles.some(role => {
      //   return permissionRoles.includes(role)
      // })
      // if (!hasPermission) {
      //   el.parentNode && el.parentNode.removeChild(el)
      // }

      if (!roles.includes(value[0])) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding) {
    // setTimeout(()=>{
    //   checkPermission(el, binding)
    // },200)
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
