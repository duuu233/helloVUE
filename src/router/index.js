import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'home',
        affix: true
      }
    }]
  }
]

export const asyncRouterMap = [{
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {
      title: '权限',
      icon: 'ums'
    },
    children: [{
        path: 'areaSettings',
        name: 'areaSettings',
        component: () => import('@/views/ums/area/index'),
        meta: {
          title: '地区配置',
          icon: 'ums-admin'
        }
      }, {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {
          title: '员工管理',
          icon: 'ums-admin'
        }
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/ums/config/index'),
        meta: {
          title: '系统配置',
          icon: 'ums-admin'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {
          title: '角色管理',
          icon: 'ums-role'
        }
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {
          title: '绑定权限'
        },
        hidden: true
      },

      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {
          title: '菜单管理',
          icon: 'ums-menu'
        }
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/ums/department/index'),
        meta: {
          title: '部门管理',
          icon: 'ums-menu'
        }
      },
      {
        path: 'setPermission',
        name: 'setPermission',
        component: () => import('@/views/ums/menu/setPermission'),
        meta: {
          title: '设置权限'
        },
        hidden: true
      },

    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/waybill',
    name: 'oms',
    meta: {
      title: '运单',
      icon: 'waybill'
    },
    children: [{
        path: 'waybill',
        name: 'waybill',
        component: () => import('@/views/oms/waybill/index'),
        meta: {
          title: '运单列表',
          icon: ''
        }
      },
      {
        path: 'waybillDetail',
        name: 'waybillDetail',
        component: () => import('@/views/oms/waybill/detail'),
        meta: {
          title: '运单详情',
          icon: ''
        }
      },



    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/deliveryGuy',
    name: 'sms',
    meta: {
      title: '运营',

    },
    children: [{
        path: 'deliveryGuy',
        name: 'deliveryGuy',
        component: () => import('@/views/sms/deliveryGuy/index'),
        meta: {
          title: '配送员列表',
          icon: ''
        }
      },
      {
        path: 'deliveryGuyDetail',
        name: 'deliveryGuyDetail',
        component: () => import('@/views/sms/deliveryGuy/detail'),
        meta: {
          title: '配送员详情',
          icon: ''
        }
      },
      {
        path: 'deliveryDc',
        name: 'deliveryDc',
        component: () => import('@/views/sms/deliveryDc/index'),
        meta: {
          title: '配送点管理',
          icon: ''
        }
      },
      {
        path: 'dispatchWork',
        name: 'dispatchWork',
        component: () => import('@/views/sms/dispatchWork/index'),
        meta: {
          title: '调度中心',
          icon: ''
        }
      },
      {
        path: 'dispatchWorkDetail',
        name: 'dispatchWorkDetail',
        component: () => import('@/views/sms/dispatchWork/detail'),
        meta: {
          title: '调度单详情',
          icon: ''
        }
      },
      {
        path: 'deliveryShop',
        name: 'deliveryShop',
        component: () => import('@/views/sms/deliveryShop/index'),
        meta: {
          title: '取货点管理',
          icon: ''
        }
      },
      {
        path: 'appVersion',
        name: 'appVersion',
        component: () => import('@/views/sms/appVersion/index'),
        meta: {
          title: '版本管理',
          icon: 'sms-flash'
        }
      },
      {
        path: 'versionDetail',
        name: 'appVeversionDetailrsion',
        component: () => import('@/views/sms/appVersion/versionDetail'),
        meta: {
          title: '版本编辑',
          icon: 'sms-flash'
        }
      },
      {
        path: 'versionDetailAdd',
        name: 'versionDetailAdd',
        component: () => import('@/views/sms/appVersion/versionDetail'),
        meta: {
          title: '新增版本',
          icon: 'sms-flash'
        }
      },
      {
        path: 'applicationStore',
        name: 'applicationStore',
        component: () => import('@/views/sms/applicationStore/index'),
        meta: {
          title: '应用市场',
          icon: 'sms-flash'
        }
      },
      {
        path: 'messagePush',
        name: 'messagePush',
        component: () => import('@/views/sms/messagePush/index'),
        meta: {
          title: '消息推送',
          icon: 'sms-flash'
        }
      },
      {
        path: 'messageUser',
        name: 'messageUser',
        component: () => import('@/views/sms/messageUser/index'),
        meta: {
          title: '用户消息',
          icon: 'sms-flash'
        }
      },
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/handle/user',
    name: 'log',
    meta: {
      title: '日志',
      icon: 'ums'
    },
    children: [{
        path: 'handle/user',
        name: 'userLogs',
        component: () => import('@/views/log/handle/user'),
        meta: {
          title: '用户操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/product',
        name: 'productLogs',
        component: () => import('@/views/log/handle/product'),
        meta: {
          title: '商品操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/order',
        name: 'orderLogs',
        component: () => import('@/views/log/handle/order'),
        meta: {
          title: '订单操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/productbasic',
        name: 'productbasicLogs',
        component: () => import('@/views/log/handle/productbasic'),
        meta: {
          title: '基础资料操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/shopdata',
        name: 'shopdataLogs',
        component: () => import('@/views/log/handle/shopdata'),
        meta: {
          title: '店铺管理操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/jurisdiction',
        name: 'jurisdictionLogs',
        component: () => import('@/views/log/handle/jurisdiction'),
        meta: {
          title: '权限系统操作日志',
          icon: 'ums-admin'
        }
      }, {
        path: 'handle/content',
        name: 'contentLogs',
        component: () => import('@/views/log/handle/content'),
        meta: {
          title: '内容操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/common',
        name: 'commonLogs',
        component: () => import('@/views/log/handle/common'),
        meta: {
          title: '公共操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'handle/delivery',
        name: 'deliveryLogs',
        component: () => import('@/views/log/handle/delivery'),
        meta: {
          title: '后台配送取货',
          icon: 'ums-admin'
        }
      },
      
      {
        path: 'handle/saleCoupon',
        name: 'saleCouponLogs',
        component: () => import('@/views/log/handle/saleCoupon'),
        meta: {
          title: '优惠券操作日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'res/request',
        name: 'requestLogs',
        component: () => import('@/views/log/res/request'),
        meta: {
          title: '接口请求日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'res/res',
        name: 'resLogs',
        component: () => import('@/views/log/res/res'),
        meta: {
          title: '接口返回日志',
          icon: 'ums-admin'
        }
      },



      {
        path: 'error/err',
        name: 'errLogs',
        component: () => import('@/views/log/error/err'),
        meta: {
          title: '异常日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'error/Jurisdiction',
        name: 'notJurisdictionLogs',
        component: () => import('@/views/log/error/Jurisdiction'),
        meta: {
          title: '无权限日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'business/order',
        name: 'businessOrderLogs',
        component: () => import('@/views/log/business/order'),
        meta: {
          title: '订单日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'business/send',
        name: 'sendLogs',
        component: () => import('@/views/log/business/send'),
        meta: {
          title: '发送日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'business/sendOrdersLogs',
        name: 'sendOrdersLogs',
        component: () => import('@/views/log/business/sendOrdersLogs'),
        meta: {
          title: '骑手派单日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'business/clockLogs',
        name: 'clockLogs',
        component: () => import('@/views/log/business/clockLogs'),
        meta: {
          title: '骑手打卡日志',
          icon: 'ums-admin'
        }
      },
      
      {
        path: 'business/waybillLogs',
        name: 'waybillLogs',
        component: () => import('@/views/log/business/waybillLogs'),
        meta: {
          title: '调度日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'business/queuingConsumer',
        name: 'queuingConsumerLogs',
        component: () => import('@/views/log/business/queuingConsumer'),
        meta: {
          title: '消息队列消费日志',
          icon: 'ums-admin'
        }
      },
      {
        path: 'business/queuingReceive',
        name: 'queuingReceiveLogs',
        component: () => import('@/views/log/business/queuingReceive'),
        meta: {
          title: '消息队列接收日志',
          icon: 'ums-admin'
        }
      },

    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap.concat(asyncRouterMap)
})
