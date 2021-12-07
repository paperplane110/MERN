/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-10-27 23:52:41
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-07 22:36:11
 */
require('dotenv').config()
const express = require('express')
const { connectToDb } = require('./db')
const { installHandler } = require('./api_handler')

const app = express()

installHandler(app)

const port = process.env.API_SERVER_PORT || 3000;
  
(async function start() {
  try {
    await connectToDb()
    app.listen(port, () => {
      console.log(`API Server listening on port ${port}`)
    })
  } catch (err) {
    console.log('ERROR:', err)
  }
}());
