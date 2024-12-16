import request from '@/utils/request'
//获取系统管理列表
export function fetchList(params) {
  return request({
    url: '/Jurisdiction/getAdminSystems',
    method: 'get',
    params: params
  })
} 
//系统管理启/禁用
export function setAdminSystemsVerify(data) {
  return request({
    url: '/Jurisdiction/setAdminSystemsVerify',
    method: 'post',
    data: data
  })
} 
//系统管理--查看员工
export function getAdminStaffBySys(params) {
  return request({
    url: '/Jurisdiction/getAdminStaffBySys',
    method: 'get',
    params: params
  })
} 
//系统管理--新增/编辑
export function setAdminSystems(data) {
  return request({
    url: '/Jurisdiction/setAdminSystems',
    method: 'post',
    data: data
  })
} 
//查询系统绑定的角色列表
export function getRoleBySystem(params) {
  return request({
    url: '/Jurisdiction/getRoleBySystem',
    method: 'get',
    params: params
  })
} 
//系统管理--系统绑定角色
export function setAdminSystemBindRoles(data) {
  return request({
    url: '/Jurisdiction/setAdminSystemBindRoles',
    method: 'post',
    data: data
  })
} 
//获取系统管理下的权限列表 
export function getAdminAppliBySys(params) {
  return request({
    url: '/Jurisdiction/getAdminAppliBySys',
    method: 'get',
    params: params
  })
} 
//设置管理权限
export function setAdminAppli(data) {
  return request({
    url: '/Jurisdiction/setAdminAppli',
    method: 'post',
    data: data
  })
} 
// 删除管理权限
export function setDelAdminAppli(data) {
  return request({
    url: '/Jurisdiction/setDelAdminAppli',
    method: 'post',
    data: data
  })
} 
// 系统管理--获取权限模块详情
export function getAdminAppliDetails(params) {
  return request({
    url: '/Jurisdiction/getAdminAppliDetails',
    method: 'get',
    params: params
  })
} 

//获取部门管理列表
export function getDepartments(params) {
  return request({
    url: '/Jurisdiction/getDepartments',
    method: 'get',
    params: params
  })
}
//新增/编辑--部门
export function setFetchTreeList(data) {
  return request({
    url: '/Jurisdiction/setDepartment',
    method: 'post',
    data: data
  })
}
//删除--部门
export function setDelDepartment(data) {
  return request({
    url: '/Jurisdiction/setDelDepartment',
    method: 'post',
    data: data
  })
}
