/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-12-06 00:25:59
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-06 00:27:44
 */
let aboutMessage = 'Issue Tracker API v1.0';

function setMessage (_, { message }) {
  aboutMessage = message
  return aboutMessage
}
  
function getMessage() {
  return aboutMessage 
}

module.exports = { getMessage, setMessage }
