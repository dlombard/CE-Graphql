import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import SongType from './types/Song'
import { nodeField } from './types/Node'
import { songConnection } from './connections/songConnection'
import { songMetaConnection } from './connections/songMetaConnection'
import { getSong } from './handlers/song'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    songs: songConnection('Songs', 'songs'),
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
