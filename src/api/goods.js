import fetch from '@/utils/fetch'

// 根据商品SKU，获取商品信息
export function goodsCard(params) {
  return fetch({
    domain: 'card',
    url: '/card/get',
    method: 'get',
    params
  })
}
