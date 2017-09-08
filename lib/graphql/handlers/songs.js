import { trim } from 'lodash'
import {
  unbase64
} from '../../utils/base64.js'
import Song from '../../db/models/Song'


const getSongs = (args, opts, doc) => {
  const connectionArgs = {
    before: args.before,
    after: args.after,
    first: args.first,
    last: args.last
  }
  const orderBy = args.order_by

  delete args.before
  delete args.after
  delete args.last
  delete args.first
  delete args.order_by

  let where = { ...args }

  if (where.book) {
    where['book.abbrv'] = where.book
    delete where.book
  }


  let sort = {}
  if (orderBy) {
    sort[orderBy] = 1
  }

  let limit

  /**
   * Graphql Connection Implementation
   */
  if (connectionArgs.first) {
    limit = connectionArgs.first
    delete args.first
  }
  if (connectionArgs.last) {
    limit = connectionArgs.last
    if (orderBy) {
      sort[orderBy] = -1
    }
    else {
      sort['_id'] = -1
    }
  }

  if (connectionArgs.after) {
    const id = trim(unbase64(connectionArgs.after), Song.modelName + ':')
    where['_id'] = { '$gt': id }
  }
  if (connectionArgs.before) {
    const id = trim(unbase64(connectionArgs.before), Song.modelName + ':')
    where['_id'] = { '$lt': id }
  }

  /**
   * Compute query along with edges and pageInfo
   */
  if (limit !== undefined) {
    if (orderBy) {
      return Song.find(where)
        .sort(sort)
        .limit(limit)
    }
    else {
      return Song.find(where)
        .limit(limit)
    }
  } else {
    if (orderBy) {
      return Song.find(where)
        .sort(sort)
    }
    else {
      return Song.find(where)
    }
  }
}

module.exports = {
  getSongs
}
