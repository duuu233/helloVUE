import request from '@/utils/request'

//登录
export function login(adminName, password) {
  return request({
    url: '/Passport/adminLogin',
    method: 'post',
    data: {
      adminName,
      password,
    }
  })
}
//顶部导航
export function getSysMenus(params) {
  return request({
    url: '/Jurisdiction/getSysMenus',
    method: 'get',
    params: params
  })
}

//获取键值对字典
export function getKeyValues(params) {
  return request({
    url: '/Common/getKeyValues',
    method: 'get',
    params: params
  })
}
//左侧导航
export function getLeftMenus(params) { 
  return request({
    url: '/Jurisdiction/getLeftMenus',
    method: 'get',
    params: params
  })
}

//菜单管理--获取登录用户已经授权的所有权限集合
export function getChildAppCodes(params) { 
  return request({
    url: '/Jurisdiction/getChildAppCodes',
    method: 'get',
    params: params
  })
}


//获取员工列表 
export function getAdminStaffs(params) {
  return request({
    url: '/Jurisdiction/getAdminStaffs',
    method: 'get',
    params: params
  })
}
//  员工管理--管理员工绑定角色
export function setAdminStaffBindRoles(data) {
  return request({
    url: '/Jurisdiction/setAdminStaffBindRoles',
    method: 'post',
    data: data
  })
}

//员工管理--获取员工绑定的角色
export function getRoleByAdminStaff(params) {
  return request({
    url: '/Jurisdiction/getRoleByAdminStaff',
    method: 'get',
    params: params
  })
}

//  员工管理--管理员工启/禁用
export function setAdminStaffVerify(data) {
  return request({
    url: '/Jurisdiction/setAdminStaffVerify',
    method: 'post',
    data: data
  })
}

//员工管理--删除管理员工
export function setDelAdminStaff(data) {
  return request({
    url: '/Jurisdiction/setDelAdminStaff',
    method: 'post',
    data: data
  })
}
//员工管理--设置管理员工
export function setAdminStaff(data) {
  return request({
    url: '/Jurisdiction/setAdminStaff',
    method: 'post',
    data: data
  })
}



//员工管理--获取管理员工详情数据
export function getAdminStaffDetails(params) {
  return request({
    url: '/Jurisdiction/getAdminStaffDetails',
    method: 'get',
    params: params
  })
}

