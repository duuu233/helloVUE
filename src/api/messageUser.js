import request from '@/utils/request'


//获取用户消息列表 分页
export function getUserMessageList(params) {
  return request({
    url: '/Content/getUserMessageList',
    method: 'get',
    params: params
  })
}


