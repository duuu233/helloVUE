import request from '@/utils/request'



//配送员管理列表
export function getDeliverGuyList(params) {
  return request({
    url: '/deliveryGuy/getDeliverGuyList',
    method: 'get',
    params: params
  })
}
//配送员管理列表导出
export function getDeliverGuyExcel(params) {
  return request({
    url: '/deliveryGuy/getDeliverGuyExcel',
    method: 'get',
    params: params
  })
}
//配送员详情页，个人列表
export function getDeliveryGuyAllList(params) {
  return request({
    url: '/deliveryGuy/getDeliveryGuyAllList',
    method: 'get',
    params: params
  })
}
//配送员详情页正在配送列表
export function getDeliveryGuyWaybillList(params) {
  return request({
    url: '/deliveryGuy/getDeliveryGuyWaybillList',
    method: 'get',
    params: params
  })
}
//配送员修改
export function setEditDeliveryGuy(data) {
  return request({
    url: '/deliveryGuy/setEditDeliveryGuy',
    method: 'post',
    data
  })
}
