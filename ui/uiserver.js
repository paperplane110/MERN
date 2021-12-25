/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-12-05 10:56:04
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-25 18:34:38
 */
require('dotenv').config()
const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true'

if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Adding dev middleware, enabling HMR')
  const webpack = require('webpack')
  const devMiddleware = require('webpack-dev-middleware')
  const hotMiddleware = require('webpack-hot-middleware')

  const config = require('./webpack.config')
  config.entry.app.push('webpack-hot-middleware/client')
  config.plugins = config.plugins || []
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  const compiler = webpack(config)
  app.use(devMiddleware(compiler))
  app.use(hotMiddleware(compiler))
}

const port = process.env.PORT || 8000

app.use(express.static('public'))

const apiProxyTarget = process.env.API_PROXY_TARGET
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }))
}

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql'
const env = { UI_API_ENDPOINT }

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`)
})

app.listen(port, () => {
  console.log(`UI started on port ${port}`)
})
