import { resultSuccess } from '../_util';
 
const menusList = [
  {
    path: '/home',
    name: 'Home',
    component: 'LAYOUT',
    redirect: '/home/index',
    meta: {
      icon: 'DashboardOutlined',
      title: '首页',
    },
    children: [

      {
        path: 'home',
        name: 'home-index',
        component: '/home/index',
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/comp',
    name: 'Comp',
    component: 'LAYOUT',
    meta: {
      title: '组件示例',
      sort: 8,
    },
    children: [
      {
        path: 'table',
        name: `comp_table`,
    
        meta: {
          title: '表格',
        },
        children: [
          {
            path: 'basic',
            name: `comp_table_basic`,
            meta: {
              title: '基础表格222',
            },
            component: '/comp/table/basic',
          
          },
          {
            path: 'editCell',
            name: `comp_table_editCell`,
            meta: {
              title: '单元格编辑',
            },
            component: '/comp/table/editCell',
     
          },
          {
            path: 'editRow',
            name: `comp_table_editRow`,
            meta: {
              title: '整行编辑',
            },
            component: '/comp/table/editRow',
          },
          {
            path: 'demo',
            name: `comp_table_demo`,
            meta: {
              title: 'demo',
            },
            component: '/demo/index',
          },
        ],
      },
     
   
    ],
  },
];

export default [
  {
    url: '/api/menus',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(menusList);
    },
  },
];
