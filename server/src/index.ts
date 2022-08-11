import 'dotenv/config'
import http from 'http'
import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.end('Hola mundo')
})

const server = http.createServer(app)

const PORT = Number(process.env.PORT || 8080)

server.listen(PORT, () => {
  console.log('Aplicación escuchando en el puerto ' + PORT)
})
