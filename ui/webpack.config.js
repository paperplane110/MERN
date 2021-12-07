/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-12-07 23:05:25
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-07 23:33:32
 */
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/App.jsx',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
}
