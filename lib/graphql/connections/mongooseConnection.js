import {
  base64
} from '../../utils/base64.js'

var connectionFromMongoose = (model, data) => {
  const edges = data.map((value, index) => ({
    cursor: base64(model.modelName + value.id),
    node: value
  }))

  return { edges, pageInfo: setPageInfo(edges) }
}

/**
 * Method to compute pageInfo
 */
const setPageInfo = (edges) => {
  const firstEdge = edges[0] ? edges[0].cursor : null
  const lastEdge = edges[edges.length - 1] ? edges[edges.length - 1].cursor : null

  return {
    startCursor: firstEdge,
    endCursor: lastEdge,
    hasPreviousPage: false,
    hasNextPage: false
  }
}

exports.connectionFromMongoose = connectionFromMongoose
