import request from '@/utils/request'
//配送点管理列表
export function getDeliveryDcList(params) {
  return request({
    url: '/deliveryDc/getDeliveryDcList',
    method: 'get',
    params: params
  })
}

//配送点管理--设置配送点管理：新增修改都走这个，根据id传值判断
export function setDeliveryDc(data) {
  return request({
    url: '/deliveryDc/setDeliveryDc',
    method: 'post',
    data
  })
}
//配送点管理删除，逻辑删除
export function setDelDeliveryDc(data) {
  return request({
    url: '/deliveryDc/setDelDeliveryDc',
    method: 'post',
    data
  })
}


// 配送点管理启用/禁用
export function setDeliveryDcVerify(data) {
  return request({
    url: '/deliveryDc/setDeliveryDcVerify',
    method: 'post',
    data
  })
}

