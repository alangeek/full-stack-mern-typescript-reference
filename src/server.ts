import express from 'express'
import http from 'http'
import mongoose from 'mongoose'

import { config } from './config/config'
import Logging from './library/Logging'

import AuthorRoutes from './routes/author.routes'

const router = express()

// Connect To Mongo
mongoose.connect(config.mongo.url).then(() => {
  Logging.info('Conectado to MongoDB')
  StartServer()
})
  .catch(err => {
    Logging.error('Unable to connect')
    Logging.error(err)
  })

// Only start the server if Mongo Connects
const StartServer = () => {
  router.use((req, res, next) => {
    // Log the Request
    Logging.info(`Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('Fineshed', () => {
      Logging.info(`Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] Status: [${res.statusCode}]`)
    })

    next()
  })
  // router.use(express.urlencoded({ extended: true }))
  router.use(express.json())

  // Rules of our API
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requestd-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }

    next()
  })

  // Routes
  router.use('/authors', AuthorRoutes)

  // Health Check
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }))

  // Error handling
  router.use((req, res, next) => {
    const err = new Error('Not Found')
    Logging.error(err)

    return res.status(404).json({ message: err.message })
  })

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is runnning on port ${config.server.port}.`))
}