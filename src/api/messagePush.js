import request from '@/utils/request'


//获取消息推送列表 分页
export function getMessagePushList(params) {
  return request({
    url: '/Content/getMessagePushList',
    method: 'get',
    params: params
  })
}




//消息推送 启用 禁用
export function setMessagePushVerify(data) {
  return request({
    url: '/Content/setMessagePushVerify',
    method: 'post',
    data: data
  })
}



//编辑 添加 消息推送
export function setMessagePushEdit(data) {
  return request({
    url: '/Content/setMessagePushEdit',
    method: 'post',
    data: data
  })
}

//获取消息推送详情
export function getMessagePushDetail(params) {
  return request({
    url: '/Content/getMessagePushDetail',
    method: 'get',
    params: params
  })
}


//消息推送 删除
export function setMessagePushDelete(data) {
  return request({
    url: '/Content/setMessagePushDelete',
    method: 'post',
    data: data
  })
}
//消息推送发送
export function setMessagePushSend(data) {
  return request({
    url: '/Content/setMessagePushSend',
    method: 'post',
    data: data
  })
}


