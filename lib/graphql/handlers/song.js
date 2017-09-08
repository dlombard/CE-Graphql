import logger from '../../logger'
import Song from '../../db/models/Song'
import { trim } from 'lodash'
import {
  unbase64
} from '../../utils/base64.js'
import { updateMeta } from '../../db/plugins/SongMeta'
const getSong = (args) => {
  const id = trim(unbase64(args.id), Song.modelName + ':')
  logger.info('By ID')
  return Song.findById(id).then((element) => {
    updateMeta(element)
    return element
  }).catch((err) => { logger.error(err) })
}

const getSongFromNode = (id) => {
  return Song.findById(id).then((element) => {
    updateMeta(element)
    return element
  }).catch((err) => { logger.error(err) })
}
module.exports = {
  getSong,
  getSongFromNode
}
