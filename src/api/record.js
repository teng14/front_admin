import fetch from '@/utils/fetch'

export function planData(params) {
  return fetch({
    domain: 'cr',
    url: '/api/customerContact/returnVisit',
    method: 'get',
    params
  })
}

export function markCustomerContact(id) {
  return fetch({
    domain: 'cr',
    url: '/api/customerContact/' + id,
    method: 'post'
  })
}

export function addRecord(data) {
  return fetch({
    domain: 'cr',
    url: '/api/customerContact',
    method: 'post',
    data
  })
}

export function getRecord(params) {
  return fetch({
    domain: 'cr',
    url: '/api/customerContact/',
    method: 'get',
    params
  })
}
