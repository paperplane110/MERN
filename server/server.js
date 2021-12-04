/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-10-27 23:52:41
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-05 00:42:45
 */
const express = require('express')
const { ApolloServer, UserInputError } = require('apollo-server-express')
const fs = require('fs')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/issuetracker'

let db;

let aboutMessage = 'Issue Tracker API v1.0'

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize (value) {
    return value.toISOString()
  },
  parseLiteral (ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value)
      return isNaN(value) ? undefined : value
    }
  },
  parseValue (value) {
    const dateValue = new Date(value)
    return isNaN(dateValue) ? undefined : dateValue
  }
})

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
}

function setAboutMessage (_, { message }) {
  return aboutMessage = message
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

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function issueAdd (_, { issue }) {
  issueValidate(issue)
  issue.created = new Date()
  issue.id = await getNextSequence('issues');

  const result = await db.collection('issues').insertOne(issue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue
}

async function issueList () {
  const issues = await db.collection('issues').find({}).toArray();
  return issues
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at ' + url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error)
    return error
  }
})

const app = express()

const fileServerMiddleware = express.static('public')

server.applyMiddleware({ app, path: '/graphql' })

app.use('/', fileServerMiddleware)

  (async function () {
    try {
      await connectToDb();
      app.listen(3000, function () {
        console.log('Server listening on port 3000')
      })
    } catch (err) {
      console.log('ERROR:', err)
    }

  })();