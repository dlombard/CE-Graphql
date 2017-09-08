import {
  GraphQLInt,
  GraphQLString
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'
import SongType from '../types/Song'
import { getSongs } from '../handlers/songs'
import Song from '../../db/models/Song'
import logger from '../../logger'
import { connectionFromMongoose } from './mongooseConnection'

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
      book: { type: GraphQLString },
      language: { type: GraphQLString },
      num: { type: GraphQLInt },
      title: { type: GraphQLString },
      songId: { type: GraphQLString },
      order_by: { type: GraphQLString }
    },
    resolve: (_, args) => {
      return getSongs(args, null, null)
        .then((data) => { return connectionFromMongoose(Song, data) })
        .catch((err) => { logger.error(err) })
    }
  }
}

exports.songConnection = songConnection
