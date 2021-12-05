/*
 * @Description:
 * @version:
 * @Author: TianyuYuan
 * @Date: 2021-10-27 23:52:41
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-05 16:26:57
 */
const fs = require('fs')
require('dotenv').config()
const express = require('express')
const { ApolloServer, UserInputError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { MongoClient } = require('mongodb')

const url = process.env.DB_URL || 'mongodb://localhost:27017/issuetracker'
const port = process.env.API_SERVER_PORT || 3000
let db

let aboutMessage = 'Issue Tracker API v1.0'

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize (value) {
    return value.toISOString()
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value)
      return isNaN(value.getTime()) ? undefined : value
    }
    return undefined
  },
  parseValue (value) {
    const dateValue = new Date(value)
    return isNaN(dateValue.getTime()) ? undefined : dateValue
  }
})

function setAboutMessage (_, { message }) {
  aboutMessage = message
  return aboutMessage
}

function issueValidate (issue) {
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

async function getNextSequence (name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false }
  )
  return result.value.current
}

async function issueAdd (_, { issue }) {
  issueValidate(issue)
  const newIssue = Object.assign({}, issue)
  newIssue.created = new Date()
  newIssue.id = await getNextSequence('issues')

  const result = await db.collection('issues').insertOne(newIssue)
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId })
  return savedIssue
}

async function issueList () {
  const issues = await db.collection('issues').find({}).toArray()
  return issues
}

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList
  },
  Mutation: {
    setAboutMessage,
    issueAdd
  },
  GraphQLDate
}

async function connectToDb () {
  const client = new MongoClient(url, { useUnifiedTopology: true })
  await client.connect()
  console.log('Connected to MongoDB at ' + url)
  db = client.db()
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error)
    return error
  }
})

const app = express()

const enableCors = (process.env.ENABLE_CORS || 'true') === 'true'
console.log('CORS setting:', enableCors)

server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

(async function start () {
  try {
    await connectToDb()
    app.listen(port, function () {
      console.log(`API Server listening on port ${port}`)
    })
  } catch (err) {
    console.log('ERROR:', err)
  }
}())
