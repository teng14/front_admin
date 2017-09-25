
let apiConfig = {}
const env = (process.env.NODE_ENV).toString()
if (env === 'development') {
  apiConfig = {
    base: 'https://easy-mock.com/mock/59bc99e7e0dc663341ac3104/admin',
    soa: 'http://soa.ypzdw.cn',
    card: 'http://card.ypzdw.cn',
    dreport: 'http://dreport.ypzdw.cn',
    rest: 'http://rest.ypzdw.cn'
  }
} else {
  apiConfig = {
    base: 'https://easy-mock.com/mock/59bc99e7e0dc663341ac3104/admin',
    soa: 'https://soa.ypzdw.com',
    card: 'http://card.ypzdw.cn',
    dreport: 'https://dreport.ypzdw.com',
    rest: 'https://rest.ypzdw.com'
  }
}

export default apiConfig
