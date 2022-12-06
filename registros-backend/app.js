const express = require('express')
const cors = require('cors')
const apiRouter = require('./api')
const path = require('path')
const connectTODB = require('./db/connectDB')

connectTODB().then(() => {
  console.log('Se pudo conectar a la base de datos')
}).catch(() => {
  console.log('NO se pudo conectar')
})

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.end('hola'))

app.use(apiRouter)

module.exports = app
