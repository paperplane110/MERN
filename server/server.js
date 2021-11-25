/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-10-27 23:52:41
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-11-25 22:26:29
 */
const express = require('express')
const { ApolloServer, UserInputError } = require('apollo-server-express')
const fs = require('fs')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

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

function issueAdd (_, { issue }) {
  issueValidate(issue)
  issue.created = new Date()
  issue.id = issueDB.length + 1
  issueDB.push(issue)
  return issue
}

function issueList () {
  return issueDB
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

app.listen(3000, function () {
  console.log('Server listening on port 3000')
})