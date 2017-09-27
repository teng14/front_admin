
let apiConfig = {}
const env = (process.env.NODE_ENV).toString()
if (env === 'development') {
  apiConfig = {
    base: 'https://easy-mock.com/mock/59bc99e7e0dc663341ac3104/admin',
    picDomain: 'http://static.ypzdw.info/Handler/FileHandler.ashx?fid=',
    soa: 'http://soa.ypzdw.cn',
    card: 'http://card.ypzdw.cn',
    dreport: 'http://dreport.ypzdw.cn',
    rest: 'http://rest.ypzdw.cn',
    ceres: 'http://ceres.ypzdw.cn',
    cr: 'http://cr.ypzdw.cn'
  }
} else {
  apiConfig = {
    base: 'https://easy-mock.com/mock/59bc99e7e0dc663341ac3104/admin',
    picDomain: 'http://static.ypzdw.info/Handler/FileHandler.ashx?fid=',
    soa: 'http://soa.ypzdw.cn',
    card: 'http://card.ypzdw.cn',
    dreport: 'http://dreport.ypzdw.cn',
    rest: 'http://rest.ypzdw.cn',
    ceres: 'http://ceres.ypzdw.cn',
    cr: 'http://cr.ypzdw.cn'
  }
  // apiConfig = {
  //   base: 'https://easy-mock.com/mock/59bc99e7e0dc663341ac3104/admin',
  //   picDomain: 'https://static.ypzdw.com/Handler/FileHandler.ashx?fid=',
  //   soa: 'https://soa.ypzdw.com',
  //   card: 'http://card.ypzdw.com',
  //   dreport: 'https://dreport.ypzdw.com',
  //   rest: 'https://rest.ypzdw.com',
  //   ceres: 'https://ceres.ypzdw.com',
  //   cr: 'https://cr.ypzdw.com'
  // }
}

export default apiConfig
