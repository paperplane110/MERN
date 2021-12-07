/*
 * @Description: 
 * @version: 
 * @Author: TianyuYuan
 * @Date: 2021-12-06 00:15:19
 * @LastEditors: TianyuYuan
 * @LastEditTime: 2021-12-06 00:21:15
 */
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

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
  
module.exports = GraphQLDate
