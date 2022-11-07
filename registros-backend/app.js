const express = require('express')
const cors = require('cors')
const apiRouter = require('./api')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

module.exports = app
