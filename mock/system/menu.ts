import { resultSuccess } from '../_util';

const menuList = () => {
  const result: any[] = [
    {
      label: 'Home',
      key: 'home',
      type: 1,
      subtitle: 'home',
      openType: 1,
      auth: 'home',
      path: '/home',
      children: [
        {
          label: '首页',
          key: 'home',
          type: 1,
          subtitle: 'home',
          openType: 1,
          auth: 'home',
          path: '/home/index',
        },
      ],
    },
    {
      label: '表单管理',
      key: 'form',
      type: 1,
      subtitle: 'form',
      openType: 1,
      auth: 'form',
      path: '/form',
      children: [
        {
          label: '基础表单',
          key: 'basic-form',
          type: 1,
          subtitle: 'basic-form',
          openType: 1,
          auth: 'basic-form',
          path: '/form/basic-form',
        },
        {
          label: '分步表单',
          key: 'step-form',
          type: 1,
          subtitle: 'step-form',
          openType: 1,
          auth: 'step-form',
          path: '/form/step-form',
        },
        {
          label: '表单详情',
          key: 'detail',
          type: 1,
          subtitle: 'detail',
          openType: 1,
          auth: 'detail',
          path: '/form/detail',
        },
      ],
    },
  ];

  return result;
};
const dList = () => {
  const result: any[] = [{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":7,"menuName":"准入申请","rank":3,"remark":"运营端-现场尽调","type":1},{"checked":true,"childMenu":[],"id":8,"menuName":"授信审批","rank":3,"remark":"运营端-授信审批","type":1},{"checked":true,"childMenu":[],"id":9,"menuName":"授信终审","rank":3,"remark":"运营端-授信终审","type":1}],"id":6,"menuName":"医贸平台授信","rank":2,"remark":"运营端-药批准入","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":56,"menuName":"准入申请","rank":3,"remark":"药店授信-准入申请","type":1},{"checked":true,"childMenu":[],"id":57,"menuName":"授信审批","rank":3,"remark":"药店授信-授信审批","type":1},{"checked":true,"childMenu":[],"id":58,"menuName":"授信终审","rank":3,"remark":"药店授信-授信终审","type":1}],"id":55,"menuName":"药店授信","rank":2,"remark":"运营端-药店授信","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":16,"menuName":"融资审核","rank":3,"remark":"运营端-融资审核","type":1},{"checked":true,"childMenu":[],"id":17,"menuName":"放款审核","rank":3,"remark":"运营端-放款审核","type":1},{"checked":true,"childMenu":[],"id":18,"menuName":"还款审核","rank":3,"remark":"运营端-还款审核","type":1}],"id":14,"menuName":"医贸平台融资","rank":2,"remark":"运营端-药批融资","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":71,"menuName":"融资审核","rank":3,"remark":"药店-融资审核","type":1},{"checked":true,"childMenu":[],"id":72,"menuName":"放款审核","rank":3,"remark":"药店-放款审核","type":1},{"checked":true,"childMenu":[],"id":73,"menuName":"还款审核","rank":3,"remark":"药店-还款审核","type":1}],"id":70,"menuName":"药店融资","rank":2,"remark":"运营端-药店融资","type":1}],"id":5,"menuName":"待办中心","rank":1,"remark":"运营端-待办中心","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":24,"menuName":"添加企业","rank":3,"remark":"药批管理-添加企业","type":1},{"checked":false,"childMenu":[],"id":25,"menuName":"填写企业信息","rank":3,"remark":"药批管理-填写企业信息","type":1},{"checked":true,"childMenu":[],"id":26,"menuName":"画像","rank":3,"remark":"药批管理-画像","type":1}],"id":2,"menuName":"医贸平台管理","rank":2,"remark":"运营端-商业医药管理","type":1},{"checked":false,"childMenu":[{"checked":false,"childMenu":[],"id":30,"menuName":"添加药店","rank":3,"remark":"药店管理-新建","type":1},{"checked":false,"childMenu":[],"id":54,"menuName":"添加企业信息","rank":3,"remark":"药店管理-添加企业信息","type":1}],"id":29,"menuName":"药店管理","rank":2,"remark":"运营端-药店管理","type":1},{"checked":false,"childMenu":[{"checked":false,"childMenu":[],"id":27,"menuName":"创建一级渠道","rank":3,"remark":"渠道管理-创建一级渠道","type":1},{"checked":false,"childMenu":[],"id":28,"menuName":"详情","rank":3,"remark":"渠道管理-详情","type":1}],"id":3,"menuName":"渠道管理","rank":2,"remark":"运营端-渠道管理","type":1},{"checked":false,"childMenu":[{"checked":false,"childMenu":[],"id":31,"menuName":"添加资金方","rank":3,"remark":"资金方管理-创建","type":1},{"checked":false,"childMenu":[],"id":32,"menuName":"详情","rank":2,"remark":"资金方管理-详情","type":1}],"id":4,"menuName":"资金方管理","rank":2,"remark":"运营端-资金方管理","type":1}],"id":1,"menuName":"用户管理","rank":1,"remark":"运营端-用户管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":87,"menuName":"发起医贸平台准入","rank":3,"remark":"发起医贸平台准入","type":1},{"checked":true,"childMenu":[],"id":88,"menuName":"医贸平台准入 - 详情\"","rank":3,"remark":"医贸平台准入 - 详情","type":1}],"id":85,"menuName":"医贸平台准入","rank":2,"remark":"运营端-医贸平台准入","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":89,"menuName":"发起药店准入","rank":3,"remark":"发起药店准入","type":1},{"checked":true,"childMenu":[],"id":90,"menuName":"药店准入 - 详情","rank":3,"remark":"药店准入 - 详情","type":1}],"id":86,"menuName":"药店准入","rank":2,"remark":"运营端-药店准入","type":1}],"id":84,"menuName":"准入管理","rank":1,"remark":"运营端-准入管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":33,"menuName":"添加尽职调查报告","rank":3,"remark":"药批授信-添加企业","type":1},{"checked":true,"childMenu":[],"id":35,"menuName":"终审资料录入","rank":3,"remark":"药批授信-终审资料录入","type":1},{"checked":true,"childMenu":[],"id":102,"menuName":"详情","rank":3,"remark":"药批授信-详情","type":1}],"id":11,"menuName":"医贸平台授信","rank":2,"remark":"运营端-药批授信","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":60,"menuName":"添加企业","rank":3,"remark":"药店授信-添加企业","type":1},{"checked":true,"childMenu":[],"id":61,"menuName":"授信资料录入","rank":3,"remark":"药店授信-授信资料录入","type":1},{"checked":true,"childMenu":[],"id":62,"menuName":"终审资料录入","rank":3,"remark":"药店授信-终审资料录入","type":1},{"checked":true,"childMenu":[],"id":103,"menuName":"详情","rank":3,"remark":"药店授信-详情","type":1}],"id":59,"menuName":"药店授信","rank":2,"remark":"运营端-药店授信","type":1}],"id":10,"menuName":"授信管理","rank":1,"remark":"运营端-授信管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":97,"menuName":"详情","rank":3,"remark":"产品额度管理-详情","type":1}],"id":96,"menuName":"项目额度管理","rank":2,"remark":"运营端-产品额度管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":101,"menuName":"详情","rank":3,"remark":"医贸平台额度管理-详情","type":1}],"id":98,"menuName":"医贸平台额度管理","rank":2,"remark":"运营端-医贸平台额度管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":100,"menuName":"详情","rank":3,"remark":"药店额度管理-详情","type":1}],"id":99,"menuName":"药店额度管理","rank":2,"remark":"运营端-药店额度管理","type":1}],"id":95,"menuName":"额度管理","rank":1,"remark":"运营端-额度管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":36,"menuName":"发起融资","rank":3,"remark":"药批融资-发起融资","type":1},{"checked":true,"childMenu":[],"id":37,"menuName":"详情","rank":3,"remark":"药批融资-详情","type":1},{"checked":true,"childMenu":[],"id":38,"menuName":"融资审核补件","rank":3,"remark":"药批融资-融资审核补件","type":1},{"checked":true,"childMenu":[],"id":39,"menuName":"放款结果录入","rank":3,"remark":"药批融资-放款结果录入","type":1},{"checked":true,"childMenu":[],"id":40,"menuName":"放款补件","rank":3,"remark":"药批融资-放款补件","type":1},{"checked":true,"childMenu":[],"id":41,"menuName":"还款结果录入","rank":3,"remark":"药批融资-还款结果录入","type":1},{"checked":true,"childMenu":[],"id":42,"menuName":"还款结果录入补件","rank":3,"remark":"药批融资-还款结果录入补件","type":1}],"id":20,"menuName":"医贸平台融资","rank":2,"remark":"运营端-药批融资","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":64,"menuName":"发起融资","rank":3,"remark":"药店融资-发起融资","type":1},{"checked":true,"childMenu":[],"id":65,"menuName":"融资审核补件","rank":3,"remark":"药店融资-融资审核补件","type":1},{"checked":true,"childMenu":[],"id":66,"menuName":"放款结果录入","rank":3,"remark":"药店融资-放款结果录入","type":1},{"checked":true,"childMenu":[],"id":67,"menuName":"放款补件","rank":3,"remark":"药店融资-放款补件","type":1},{"checked":true,"childMenu":[],"id":68,"menuName":"还款结果录入","rank":3,"remark":"药店融资-还款结果录入","type":1},{"checked":true,"childMenu":[],"id":69,"menuName":"还款补件","rank":3,"remark":"药店融资-还款补件","type":1},{"checked":true,"childMenu":[],"id":74,"menuName":"详情","rank":3,"remark":"药店融资-详情","type":1}],"id":63,"menuName":"药店融资","rank":2,"remark":"运营端-药店融资","type":1}],"id":19,"menuName":"融资管理","rank":1,"remark":"运营端-融资管理","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":93,"menuName":"新增项目","rank":3,"remark":"产品中心-新增项目","type":1},{"checked":true,"childMenu":[],"id":94,"menuName":"项目详情","rank":3,"remark":"产品中心-项目详情","type":1}],"id":92,"menuName":"项目列表","rank":2,"remark":"产品中心-项目列表","type":1}],"id":91,"menuName":"产品中心","rank":1,"remark":"运营端-产品中心","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":43,"menuName":"下载","rank":3,"remark":"药批服务费-下载","type":1}],"id":22,"menuName":"医贸平台服务费","rank":2,"remark":"运营端-药批服务费\n\n","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":44,"menuName":"下载","rank":3,"remark":"渠道分润-下载","type":1}],"id":23,"menuName":"渠道分润","rank":2,"remark":"运营端-渠道分润","type":1}],"id":21,"menuName":"对账单","rank":1,"remark":"运营端-对账单","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":13,"menuName":"规则管理","rank":2,"remark":"运营端-规则管理","type":1}],"id":12,"menuName":"风控预警","rank":1,"remark":"运营端-风控预警","type":1},{"checked":true,"childMenu":[{"checked":true,"childMenu":[],"id":52,"menuName":"角色管理","rank":2,"remark":"系统中心-角色管理","type":1},{"checked":true,"childMenu":[],"id":53,"menuName":"用户管理","rank":2,"remark":"系统中心-用户管理","type":1}],"id":50,"menuName":"系统中心","rank":1,"remark":"运营端-系统中心","type":1}]
  return result;
};
export default [
  {
    url: '/api/menu/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      const list = menuList();
      return resultSuccess({
        list,
      });
    },
  },
  {
    url: '/api/menu/dlist',
    timeout: 1000,
    method: 'get',
    response: () => {
      const list = dList();
      return resultSuccess({
        list,
      });
    },
  },
];


