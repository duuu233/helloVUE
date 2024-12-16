import request from '@/utils/request'


//获取商品运费详情
export function getProductFreightTempDetail(params) {
  return request({
    url:'/Product/getProductFreightTempDetail',
    method:'get',
    params:params
  })
}

//获取运费模板分页
export function getProductFreightTempList(params) {
  return request({
    url:'/Product/getProductFreightTempList',
    method:'get',
    params:params
  })
}


//删除运费模板
export function setProductFreightTempDelete(data) {
  return request({
    url:'/Product/setProductFreightTempDelete',
    method:'post',
    data:data
  })
}

//添加编辑运费模板
export function setProductFreightTempEdit(data) {
    return request({
      url:'/Product/setProductFreightTempEdit',
      method:'post',
      data:data
    })
  }

  //禁用启用运费模板
export function setProductFreightTempVerify(data) {
    return request({
      url:'/Product/setProductFreightTempVerify',
      method:'post',
      data:data
    })
  }