import request from '@/utils/request'


//获取系统配置数据
export function getConfigDataList(params) {
  return request({
    url:'/Common/getConfigDataList',
    method:'get',
    params:params
  })
}

//获取区域数据
export function getAreaDataList(params) {
  return request({
    url:'/Common/getAreaDataList',
    method:'get',
    params:params
  })
}

//系统配置更新操作
export function setConfigDataEdit(data) {
  return request({
    url:'/Common/setConfigDataEdit',
    method:'post',
    data:data
  })
}