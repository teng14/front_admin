import fetch from '@/utils/fetch'

// 根据订单号获取订单基本信息
export function getOrderInfo(ordercode) {
  return fetch({
    domain: 'soa',
    url: '/Order/rest',
    method: 'post',
    data: {
      'Token': '',
      'Method': 'order.ordermain.getorderpaygoods',
      'Format': 'json',
      'Args': '{ ordercode:"' + ordercode + '" }'
    }
  })
}

// 获取订单详情
export function getOrderDetail(areaCode, uid, ordercode) {
  return fetch({
    domain: 'soa',
    url: '/Order/rest',
    method: 'post',
    data: {
      'Method': 'order.ordermain.getorderdetail',
      'Format': 'json',
      'Args': '{ areacode: "' + areaCode + '", uid:"' + uid + '", ordercode:"' + ordercode + '" }'
    }
  })
}

// 获取订单详情
export function makerRemark(ordercode) {
  return fetch({
    domain: 'ceres',
    url: '/api/order/makerOrder/remark',
    method: 'get',
    params: {
      orderCode: ordercode
    }
  })
}

