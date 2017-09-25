import fetch from '@/utils/fetch'

export function planData(params) {
  return fetch({
    domain: 'base',
    url: '/api/customerContact/returnVisit',
    method: 'get',
    params
  })
}

export function markCustomerContact(id) {
  return fetch({
    domain: 'base',
    url: '/api/customerContact/' + id,
    method: 'post'
  })
}

export function addRecord(params) {
  return fetch({
    domain: 'base',
    url: '/api/customerContact/',
    method: 'post',
    params
  })
}

export function getRecord(params) {
  return fetch({
    domain: 'base',
    url: '/api/customerContact/',
    method: 'get',
    params
  })
}
