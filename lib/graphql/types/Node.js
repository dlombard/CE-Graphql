import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

import { getSong } from '../handlers/song'
//import logger from '../../logger'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId)

    switch (type) {
      case 'Song':
        return getSong({ id })
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
