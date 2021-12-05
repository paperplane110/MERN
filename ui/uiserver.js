/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-12-05 10:56:04
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-05 12:11:49
 */
require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.use(express.static('public'));

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || "http://localhost:3000/graphql"
const env = { UI_API_ENDPOINT };

app.get('/env.js', function (req, res) {
  res.send(`window.ENV = ${JSON.stringify(env)}`)
})

app.listen(port, function () {
  console.log(`UI started on port ${port}`)
})