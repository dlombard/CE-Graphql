import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'
import {
  GraphQLInt,
  GraphQLString
} from 'graphql'

import SongType from '../types/Song'
import { getSongMeta } from '../handlers/song_meta'

const songMetaConnection = (name, swapiType) => {
  const { connectionType } = connectionDefinitions({
    name,
    nodeType: SongType
  })

  return {
    type: connectionType,
    args: {
      ...connectionArgs,
      song_id: { type: GraphQLString },
      day: { type: GraphQLInt },
      week: { type: GraphQLInt },
      year: { type: GraphQLInt },
      direction: { type: GraphQLString },
      _day: { type: GraphQLInt },
      _week: { type: GraphQLInt },
      _year: { type: GraphQLInt }
    },
    resolve: (_, args) => {
      return getSongMeta(args, null, null)
    }
  }
}

exports.songMetaConnection = songMetaConnection
