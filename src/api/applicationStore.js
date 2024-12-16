import request from '@/utils/request'
//获取应用市场详情
export function getAppMarketDetail(params) {
  return request({
    url: '/Content/getAppMarketDetail',
    method: 'get',
    params: params
  })
}

//获取应用市场列表
export function getAppMarketList(params) {
    return request({
      url: '/Content/getAppMarketList',
      method: 'get',
      params: params
    })
  }

  //添加编辑应用市场列表
export function setAppMarketEdit(data) {
    return request({
      url: '/Content/setAppMarketEdit',
      method: 'post',
      data: data
    })
  }

  //禁用启用应用市场列表
export function setAppMarketVerify(data) {
    return request({
      url: '/Content/setAppMarketVerify',
      method: 'post',
      data: data
    })
  }

  //删除应用市场
export function setAppMarketDelete(data) {
    return request({
      url: '/Content/setAppMarketDelete',
      method: 'post',
      data: data
    })
  }