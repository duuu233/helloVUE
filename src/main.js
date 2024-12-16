import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
// import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import permission from './directive/permission' //自定义权限指令

Vue.use(permission)
Vue.use(ElementUI, {
  locale
})
// Vue.use(VCharts)

Vue.config.productionTip = false 
// 引入vxe-table 
// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'
// import VXETablePluginElement from 'vxe-table-plugin-element'
// import 'vxe-table-plugin-element/dist/style.css'
// Vue.prototype.$XModal = VXETable.modal
// Vue.use(VXETable)
// VXETable.use(VXETablePluginElement)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
