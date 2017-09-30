
const env = (process.env.NODE_ENV).toString()
let baseConfig = {}
if (env === 'development') {
  baseConfig = {
    protocol: 'http:',
    domainSuffix: 'info',
    soa: 'openapisoa'
  }
} else {
  baseConfig = {
    protocol: 'https:',
    domainSuffix: 'com',
    soa: 'soa2'
  }
}
const apiConfig = {
  protocol: baseConfig['protocol'],
  domainSuffix: baseConfig['domainSuffix'],
  base: baseConfig['protocol'] + '//www.ypzdw.' + baseConfig['domainSuffix'],
  yaoyi: baseConfig['protocol'] + '//yaoyi.ypzdw.' + baseConfig['domainSuffix'],
  passport: baseConfig['protocol'] + '//passport.ypzdw.' + baseConfig['domainSuffix'],
  picDomain: baseConfig['protocol'] + '//static.ypzdw.' + baseConfig['domainSuffix'] + '/Handler/FileHandler.ashx?fid=',
  soa: baseConfig['protocol'] + '//' + baseConfig['soa'] + '.ypzdw.' + baseConfig['domainSuffix'],
  card: baseConfig['protocol'] + '//card.ypzdw.' + baseConfig['domainSuffix'],
  dreport: baseConfig['protocol'] + '//dreport.ypzdw.' + baseConfig['domainSuffix'],
  rest: baseConfig['protocol'] + '//rest.ypzdw.' + baseConfig['domainSuffix'],
  ceres: baseConfig['protocol'] + '//ceres.ypzdw.' + baseConfig['domainSuffix'],
  cr: baseConfig['protocol'] + '//cr.ypzdw.' + baseConfig['domainSuffix']
}

export default apiConfig
