import request from '@/utils/request'




//取货点管理列表
export function getDeliveryShopList(params) {
  return request({
    url: '/deliveryShop/getDeliveryShopList',
    method: 'get',
    params: params
  })
}

//取货点管理--设置取货点管理：新增修改都走这个，根据id传值判断
export function setDeliveryShop(data) {
  return request({
    url: '/deliveryShop/setDeliveryShop',
    method: 'post',
    data
  })
}


//取货点管理删除，物理删除
export function setDelDeliveryShop(data) {
  return request({
    url: '/deliveryShop/setDelDeliveryShop',
    method: 'post',
    data
  })
}



//erp-取货点管理列表


export function getErpDeliveryShopList(params) {
  return request({
    url: '/deliveryShop/getErpDeliveryShopList',
    method: 'get',
    params
  })
}



//erp-取货点管理--编辑仓库半径

export function setErpDeliveryShopList(data) {
  return request({
    url: '/deliveryShop/setErpDeliveryShopList',
    method: 'post',
    data
  })
}
