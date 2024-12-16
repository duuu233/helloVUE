import request from '@/utils/request'


//运单列表
export function getWayBillList(params) {
  return request({
    url: '/Waybill/getWayBillList',
    method: 'get',
    params: params
  })
}
//运单列表详情
export function getWayBillRecordList(params) {
  return request({
    url: '/Waybill/getWayBillRecordList',
    method: 'get',
    params: params
  })
}
//导出运单列表
export function getWayBillListExcel(params) {
  return request({
    url: '/Waybill/getWayBillListExcel',
    method: 'get',
    params: params
  })
}


//调度中心详情
export function getDispatchWorkbenchDetails(params) {
  return request({
    url: '/dispatchWork/getDispatchWorkbenchDetails',
    method: 'get',
    params: params
  })
}


//更新运单配送状态
export function setUpdateDeliveryStatus(data) {
  return request({
    url: '/Waybill/setUpdateDeliveryStatus',
    method: 'post',
    data
  })
}