import request from '@/utils/request'
//获取商品基础资料列表 分页
export function getAreaDataList(params) {
  return request({
    url: '/Common/getAreaDataList',
    method: 'get',
    params: params
  })
}
//删除 区域数据
export function setAreaDataDelete(data) {
  return request({
    url: '/Common/setAreaDataDelete',
    method: 'post',
    data: data
  })
}

//添加 区域数据
export function setAreaDataEdit(data) {
  return request({
    url: '/Common/setAreaDataEdit',
    method: 'post',
    data: data
  })
}
//修改 区域名称
export function setAreaDataUpdateName(data) {
    return request({
      url: '/Common/setAreaDataUpdateName',
      method: 'post',
      data: data
    })
  }
  //获取区域数据详情
  export function getAreaDataDetail(params) {
    return request({
      url: '/Common/getAreaDataDetail',
      method: 'get',
      params: params
    })
  }



