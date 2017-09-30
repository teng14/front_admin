import fetch from '@/utils/fetch'

// 根据商品SKU，获取品种
export function skuGetProduct(params) {
  return fetch({
    domain: 'rest',
    url: '/itemDomain/v2/getSkuForSaleByProductIdWithBlackList',
    method: 'get',
    params
  })
}
