import request from '@/utils/request'


export function getServiceList(params){
  return request({
    url:'/api/my/service',
    method:'get',
    params:params
  })
}

export function getProduct(params){
  return request({
    url:'/api/product',
    method:'get',
    params:params
  })
}


export function postOrderInfo(params){
  return request({
    url:'/api/order',
    method:'post',
    params:params
  })
}


export function getPayUrl(params){
  return request({
    url:'/api/pay',
    method:'get',
    params:params
  })
}

export function getOrderInfo(params){
  return request({
    url:'/api/order/get',
    method:'get',
    params:params
  })
}

export function postOrderPayType(params){
  return request({
    url:'/api/pay/transfer',
    method:'post',
    params:params
  })
}

export function cancleOrder(params){
  return request({
    url:'/api/order/cancel',
    method:'post',
    params:params
  })
}

export function getOrderList(params){
  return request({
    url:'/api/order/list',
    method:'get',
    params:params
  })
}


export function getHetong(order_id){
  return request({
    url:'/api/order/hetong?order_id='+order_id,
    method:'get',
  })
}

export function createHetong(order_id, het){
  return request({
    url:'/api/order/hetong?order_id='+order_id,
    method:'Post',
    data:het,
  })
}
