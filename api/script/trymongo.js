/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-11-25 22:25:50
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-05 16:18:07
 */
require('dotenv').config()
const { MongoClient } = require('mongodb')

const url = process.env.DB_URL || 'mongodb://localhost/issuetracker'

function testWithCallbacks (callback) {
  console.log('\n--- testWithCallbacks ---')
  const client = new MongoClient(url, { useNewUrlParser: true })
  client.connect((connErr) => {
    if (connErr) {
      callback(connErr)
      return
    }
    console.log('Connect to MongoDB', url)

    const db = client.db()
    const collection = db.collection('employees')

    const employee = { id: 1, name: 'A. Callback', age: 23 }
    collection.insertOne(employee, (insertErr, result) => {
      if (insertErr) {
        client.close()
        callback(insertErr)
        return
      }
      console.log('Result of insert:\n', result.insertedId)
      collection.find({ _id: result.insertedId }).toArray(
        function (err, docs) {
          if (err) {
            client.close()
            callback(err)
            return
          }
          console.log('Result of find:\n', docs)
          client.close()
          callback()
        }
      )
    })
  })
}

async function testWithAsync () {
  console.log('\n--- testWithAsync ---')
  const client = new MongoClient(url, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log('Connect to MongoDB', url)
    const db = client.db()
    const collection = db.collection('employees')

    const employee = { id: 1, name: 'A. Callback', age: 23 }
    const result = await collection.insertOne(employee)
    console.log('Result of insert:\n', result.insertedId)

    const docs = await collection.find({ _id: result.insertedId }).toArray()
    console.log('Result of find:\n', docs)
  } catch (err) {
    console.log(err)
  } finally {
    client.close()
  }
}

testWithCallbacks(function (err) {
  if (err) {
    console.log(err)
  }
  testWithAsync()
})
