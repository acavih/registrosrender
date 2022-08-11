import 'dotenv/config'
import http from 'http'
import express from 'express'
import { PORT, URI_DB_MONGO } from './vars'
import connectDB from './connectDB'

connectDB(URI_DB_MONGO).then(() => {
  const app = express()

  app.get('/', (_req, res) => {
    res.end('Hola mundo')
  })

  const server = http.createServer(app)

  server.listen(PORT, () => {
    console.log('Aplicación escuchando en el puerto ' + PORT)
  })
}).catch(() => {
  console.log('La aplicación no pudo arrancar')
})
