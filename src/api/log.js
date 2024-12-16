import request from '@/utils/request'
import requestPay from '@/utils/requestPay'
//获取管理员操作日志列表
export function getOperationLogs(params) {
  return request({
    url: '/Log/getOperationLogs',
    method: 'get',
    params: params
  })
}

//获取接口请求日志
export function getRequestLogs(params) {
  return request({
    url: '/Log/getRequestLogs',
    method: 'get',
    params: params
  })
}

//获取接口返回日志
export function getResLogs(params) {
  return request({
    url: '/Log/getResLogs',
    method: 'get',
    params: params
  })
}
//获取管理员无权限日志
export function getJurisdictionLogs(params) {
  return request({
    url: '/Log/getJurisdictionLogs',
    method: 'get',
    params: params
  })
}

//获取异常日志
export function getErrorLogs(params) {
  return request({
    url: '/Log/getErrorLogs',
    method: 'get',
    params: params
  })
}
//获取业务日志
export function getBusinessLogs(params) {
  return request({
    url: '/Log/getBusinessLogs',
    method: 'get',
    params: params
  })
}


//获取消息队列消费日志
export function getQueuingConsumerLogs(params) {
  return request({
    url: '/Log/getQueuingConsumerLogs',
    method: 'get',
    params: params
  })
}


//获取消息队列接收日志
export function getQueuingReceiveLogs(params) {
  return request({
    url: '/Log/getQueuingReceiveLogs',
    method: 'get',
    params: params
  })
}



//微信支付接口相关日志
export function getLogWxPayRequest(params) {
  return request({
    url: '/Log/getLogWxPayRequest',
    method: 'get',
    params: params
  })
}

//微信小程序授权相关日志
export function getLogWxAppRequest(params) {
  return request({
    url: '/Log/getLogWxAppRequest',
    method: 'get',
    params: params
  })
}


//支付成功记录
export function getLogPaySuccess(params) {
  return request({
    url: '/Log/getLogPaySuccess',
    method: 'get',
    params: params
  })
}

//退款成功记录
export function getLogPayRefundSuccess(params) {
  return request({
    url: '/Log/getLogPayRefundSuccess',
    method: 'get',
    params: params
  })
}

//支付宝支付接口相关日志
export function getLogAliPayRequest(params) {
  return request({
    url: '/Log/getLogAliPayRequest',
    method: 'get',
    params: params
  })
}


//支付查询接口
export function getPayQuery(params) {
  return requestPay({
    url: '/Pay/getPayQuery',
    method: 'get',
    params: params
  })
}



//支付退款查询接口
export function getPayRefundQuery(params) {
  return requestPay({
    url: '/Pay/getPayRefundQuery',
    method: 'get',
    params: params
  })
}
//获取骑手派单日志
export function getWaybillDispatchLogs(params) {
  return request({
    url: '/Log/getWaybillDispatchLogs',
    method: 'get',
    params: params
  })
}
//骑手派单列表导出
export function getWaybillDispatchExcel(params) {
  return request({
    url: '/Log/getWaybillDispatchExcel',
    method: 'get',
    params: params
  })
}

//获取骑手打卡日志
export function getDeliveryGuyStatusLogs(params) {
  return request({
    url: '/Log/getDeliveryGuyStatusLogs',
    method: 'get',
    params: params
  })
}


