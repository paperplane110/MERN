const express = require('express');
const app = express();

const fileServerMiddleware = express.static('public')

app.use('/', fileServerMiddleware)

app.listen(3000, function () {
  console.log('Server listening on port 3000')
})