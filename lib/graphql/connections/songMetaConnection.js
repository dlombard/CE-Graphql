import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'
import SongType from '../types/Song'
import { getSongMeta } from '../crud'
import Song from '../../db/models/Song'

const songMetaConnection = (name, swapiType) => {
  const { connectionType } = connectionDefinitions({
    name,
    nodeType: SongType
  })

  return {
    type: connectionType,
    args: {
      ...connectionArgs
    },
    resolve: (_, args) => {
      return getSongMeta(Song, args, null, null)
    }
  }
}

exports.songMetaConnection = songMetaConnection
