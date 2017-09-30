require('./check-versions')()

process.env.NODE_ENV = 'development'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.dev.conf')

var spinner = ora('正在构建stage环境文件')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  构建完成！\n'))
    console.log(chalk.yellow(
      '  Tip: 构建的文件应该在HTTP服务器上运行！\n' +
      '  以file://访问将会报错，请在服务器上运行\n'
    ))
  })
})
