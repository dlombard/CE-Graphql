import logger from '../../logger'
import Song from '../../db/models/Song'


const getSong = (args) => {
  return Song.findById(args.id).then((element) => { return element }).catch((err) => { logger.error(err) })
}


module.exports = {
  getSong
}
