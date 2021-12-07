/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-12-06 00:53:02
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-06 01:14:23
 */

const { UserInputError } = require('apollo-server-express')
const { getDb, getNextSequence } = require('./db')

async function list() {
  const db = getDb()
  const issues = await db.collection('issues').find({}).toArray()
  return issues
}

function validate (issue) {
  const errors = []
  if (issue.title.length < 3) {
    errors.push('Field title must be at least 3 characters long.')
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field owner must be assigned when status is assigned')
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors })
  }
}

async function add(_, { issue }) {
  const db = getDb()
  validate(issue)
  
  const newIssue = Object.assign({}, issue)
  newIssue.created = new Date()
  newIssue.id = await getNextSequence('issues')

  const result = await db.collection('issues').insertOne(newIssue)
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId })
  return savedIssue
}

module.exports = { list, add }
