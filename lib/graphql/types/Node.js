import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

import { getById } from '../crud'
import Song from '../../db/models/Song'
//import logger from '../../logger'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)

    switch (type) {
      case 'Song':
        return getById(Song, { id })
      default:
        return null
    }
  },
  (obj) => {
    if (obj.songId) {
      return 'Song'
    }
    return null
  }
)

module.exports = { nodeInterface, nodeField }
