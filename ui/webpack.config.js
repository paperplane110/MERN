/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-12-07 23:05:25
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-25 18:16:04
 */
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {app: ['./src/App.jsx']},
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  }
}
