import request from '@/utils/request'
// 获取角色数据列表
export function getRoles(params) {
  return request({
    url: '/Jurisdiction/getRoles',
    method: 'get',
    params: params
  })
}
// 获取属于该角色下的员工列表
export function fetchStaffList(params) {
  return request({
    url: '/Jurisdiction/getAdminStaffByRole',
    method: 'get',
    params: params
  })
}
// 角色管理--获取角色下的权限列表
export function getAdminAppliByRole(params) {
  return request({
    url: '/Jurisdiction/getAdminAppliByRole',
    method: 'get',
    params: params
  })
}

 //角色管理--角色绑定权限
export function setAdminAppliByRole(data) {
  return request({
    url: '/Jurisdiction/setAdminAppliByRole',
    method: 'post',
    data: data
  })
}
 //角色管理--设置角色
 export function setRole(data) {
  return request({
    url: '/Jurisdiction/setRole',
    method: 'post',
    data: data
  })
}
 //角色管理--获取角色详情数据
 export function getRoleDetails(params) {
  return request({
    url: '/Jurisdiction/getRoleDetails',
    method: 'get',
    params: params
  })
}

//角色启/禁用
export function setRoleVerify(data) {
  return request({
    url: '/Jurisdiction/setRoleVerify',
    method: 'post',
    data: data
  })
}
//角色管理--删除角色
export function setDelRole(data) {
  return request({
    url: '/Jurisdiction/setDelRole',
    method: 'post',
    data: data
  })
}


export function fetchAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}
