import fetch from '@/utils/fetch'

export function planData(params) {
  return fetch({
    url: '/api/customerContact/returnVisit',
    method: 'get',
    params
  })
}

export function markCustomerContact(id) {
  return fetch({
    url: '/api/customerContact/' + id,
    method: 'post'
  })
}

export function addRecord(params) {
  return fetch({
    url: '/api/customerContact/',
    method: 'post',
    params
  })
}
