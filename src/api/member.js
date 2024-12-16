import request from '@/utils/request'


//用户列表(用户昵称、手机号采用关键参数keyword,注册日期采用参数startDate,endDate)
export function getUsers(params) {
  return request({
    url:'/User/getUsers',
    method:'get',
    params:params
  })
}
//用户详情(id=用户id)
export function getUserDetails(params) {
  return request({
    url:'/User/getUserDetails',
    method:'get',
    params:params
  })
}




//用户详情订单列表(id=用户id,日期采用参数startDate,endDate)
export function getUserDetailsOrders(params) {
  return request({
    url:'/User/getUserDetailsOrders',
    method:'get',
    params:params
  })
}