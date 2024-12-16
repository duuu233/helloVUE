import request from '@/utils/request'



//调度中心列表
export function getDispatchWorkbenchList(params) {
  return request({
    url: '/dispatchWork/getDispatchWorkbenchList',
    method: 'get',
    params: params
  })
}


//调度中心列表导出
export function getDispatchWorkbenchExcel(params) {
  return request({
    url: '/dispatchWork/getDispatchWorkbenchExcel',
    method: 'get',
    params: params
  })
}
// 调度中心查询所属区域列表
export function getQueryDcName(params) {
  return request({
    url: '/dispatchWork/getQueryDcName',
    method: 'get',
    params: params
  })
}
//  调度中心手动派单
export function setManualWaybill(data) {
  return request({
    url: '/dispatchWork/setManualWaybill',
    method: 'post',
    data: data
  })
}
//调度中心订单状态修改
export function setTaskOrderState(data) {
  return request({
    url: '/dispatchWork/setTaskOrderState',
    method: 'post',
    data: data
  })
}

