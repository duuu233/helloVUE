import request from '@/utils/request'



//首页统计--运单总览、配送员总览、待处理事务的数量
export function getStatisticsToTms(params) {
  return request({
    url: '/Common/getStatisticsToTms',
    method: 'get',
    params: params
  })
}



//首页统计--运单统计--统计图(如开始时间与结束时间时同一天则按照有小时的时间显示)
export function getStatisticsToTmsWayBillByDay(params) {
  return request({
    url: '/Common/getStatisticsToTmsWayBillByDay',
    method: 'get',
    params: params
  })
}
//  首页统计--运单统计--相比比例
export function getStatisticsToTmsWayBillRatio(params) {
  return request({
    url: '/Common/getStatisticsToTmsWayBillRatio',
    method: 'get',
    params: params
  })
}


