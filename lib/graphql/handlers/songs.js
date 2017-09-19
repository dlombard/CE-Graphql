import Song from '../../db/models/Song'
import logger from '../../logger'

const getSongs = (args, opts, doc) => {
  logger.warn('GETSONGS')

  const orderBy = args.order_by
  let where = { ...args }

  delete where.before
  delete where.after
  delete where.last
  delete where.first
  delete where.order_by

  if (where.book) {
    where['book.abbrv'] = where.book.toUpperCase()
    delete where.book
  }


  let sort = {}
  if (orderBy) {
    sort[orderBy] = 1
  }

  if (orderBy) {
    return Song.find(where)
      .sort(sort)
  } else {
    return Song.find(where)
  }
}

module.exports = {
  getSongs
}
