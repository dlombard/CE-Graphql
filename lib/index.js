import bodyParser from 'body-parser'
import express from 'express'
import compression from 'compression'
import db from './db'
import logger from './logger'
import graphql from './graphql/graphqlHTTP'
import { graphiqlExpress } from 'graphql-server-express'
import http from 'http'
import cors from 'cors'
const app = express()
let port = process.env.PORT || 3000

app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('morgan')('combined', { 'stream': logger.stream }))

app.use('/graphql', cors(), (req, res, next) => {
  next()
}, graphql())
if (process.env.NODE_ENV !== 'production') {
  logger.info('Development Mode')
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
}
const server = http.createServer(app)
const start = () => db.start().then(() => {
  server.listen(port, function () {
    logger.info(`API Server is now running on port ${port}`)
  })
}).catch((err) => {
  logger.error(err)
  setTimeout(() => { start() }, 5000)
})

const gracefulShutdown = () => {
  logger.info('Received kill signal, shutting down gracefully.')
  db.close()
  server.close(() => {
    logger.info('Closed out remaining connections.')
    process.exit()
  })

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down')
    process.exit()
  }, 10 * 1000)
}

start()
// listen for TERM signal .e.g. kill 
process.on('SIGTERM', gracefulShutdown)

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown)



// ;
