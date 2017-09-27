import fetch from '@/utils/fetch'

// 查询终端
export function searchCustomer(keywords, page, pageSize) {
  return fetch({
    domain: 'cr',
    url: '/customerDetail/search',
    method: 'get',
    params: {
      keywords,
      page,
      pageSize
    }
  })
}

// 客户基础信息
export function basicInfo(ecommerceId) {
  return fetch({
    domain: 'cr',
    url: '/customerDetail/basicInfo',
    method: 'get',
    params: {
      ecommerceId
    }
  })
}

// 购物车
export function cartInfo(ecommerceId) {
  return fetch({
    domain: 'cr',
    method: 'get',
    url: '/customerRecentCase/cartInfo',
    params: {
      ecommerceId
    }
  })
}

// 订单基本信息
/* response 1.待支付2.待收货 3.待评价 4.待确认冲红 5.待出库
*/
export function orderCount(uid) {
  return fetch({
    domain: 'soa',
    url: '/Order/rest',
    method: 'post',
    data: {
      'Method': 'order.ordermain.getorderstatuscount',
      'Format': 'json',
      'Args': '{ uid: ' + uid + ', onlyWithIsReceipt: 1 }'
    }
  })
}

// 采购能力统计
export function buyingPower(uid) {
  return fetch({
    domain: 'dreport',
    url: '/exterior/data/alias/buyerBuyingPower',
    method: 'get',
    params: {
      buyer_id: uid
    }
  })
}

