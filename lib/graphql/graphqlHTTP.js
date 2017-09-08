import QueryType from './query'
import { graphqlExpress } from 'graphql-server-express'
import graphqlHTTP from 'express-graphql'
var { GraphQLSchema } = require('graphql')


module.exports = function initGraphQL () {
  const schema = new GraphQLSchema({
    query: QueryType
    //  mutation: MutationType,
  })

  return graphqlExpress((req) => {
    return {
      schema: schema,
      graphiql: true
    }
  })
}
