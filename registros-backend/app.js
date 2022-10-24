const express = require('express')
const apiRouter = require('./api')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

module.exports = app
