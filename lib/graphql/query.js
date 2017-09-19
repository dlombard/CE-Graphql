import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'
import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'

import SongType from './types/Song'
import { nodeInterface, nodeField } from './types/Node'
import { songMetaConnection } from './connections/songMetaConnection'
import { getSong } from './handlers/song'
import { getSongs } from './handlers/songs'


const { connectionType: SongsConnection } = connectionDefinitions({
  nodeType: SongType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: conn => conn.totalCount,
      description:
      `A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example.`
    }
  })
})

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    songs: {
      type: SongsConnection,
      args: {
        ...connectionArgs,
        book: { type: GraphQLString },
        language: { type: GraphQLString },
        num: { type: GraphQLInt },
        title: { type: GraphQLString },
        songId: { type: GraphQLString },
        order_by: { type: GraphQLString }
      },
      resolve: (root, args) => connectionFromPromisedArray(
        getSongs(args, null, null),
        args
      ),
    }
  }),
  interfaces: [nodeInterface]
})
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: Viewer,
      resolve: () => { return true }
    },
    //songs: songConnection('Songs', 'songs'),
    song: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (root, args) => { return getSong(args) }
    },
    songsMeta: songMetaConnection('Meta', 'songs')
  })
})

module.exports = QueryType
