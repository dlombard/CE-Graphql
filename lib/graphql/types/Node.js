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
      case 'Viewer':
        return true
      default:
        return null
    }
  },
  (obj) => {
    if (obj.songId) {
      return 'Song'
    } else {
      return 'Viewer'
    }

  }
)

module.exports = { nodeInterface, nodeField }
