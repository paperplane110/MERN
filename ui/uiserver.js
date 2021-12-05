/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-12-05 10:56:04
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-05 10:57:41
 */

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(8000, function () {
  console.log('UI started on port 8000')
})