import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'
import SongType from '../types/Song'
import { getAllSongs as db } from '../crud'
import Song from '../../db/models/Song'

const songConnection = (name, swapiType) => {
  const { connectionType } = connectionDefinitions({
    name,
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

  return {
    type: connectionType,
    args: {
      ...connectionArgs,
      book: { type: new GraphQLNonNull(GraphQLString) },
      language: { type: new GraphQLNonNull(GraphQLString) },
      orderby: { type: GraphQLString }
    },
    resolve: (_, args) => {
      return db(Song, args, null, null)
    }
  }
}

exports.songConnection = songConnection
