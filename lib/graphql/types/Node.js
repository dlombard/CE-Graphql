import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

import { getSongFromNode } from '../handlers/song'
import logger from '../../logger'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)
    logger.warn(type)
    logger.warn(id)
    switch (type) {
      case 'Song':
        return getSongFromNode(id)
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
