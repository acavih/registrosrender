import 'dotenv/config'
import http from 'http'
import express from 'express'
import cors from 'cors'
import { PORT, URI_DB_MONGO } from './vars'
import connectDB from './connectDB'
import apiRouteV1 from './api/v1/apiRouteV1'

connectDB(URI_DB_MONGO).then(() => {
  const app = express()

  app.use(cors())

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/api/v1', apiRouteV1)

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log('Aplicación escuchando en el puerto ' + PORT)
  })
}).catch(() => {
  console.log('La aplicación no pudo arrancar')
})
