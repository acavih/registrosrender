const express = require('express')
const { authUserMiddleware } = require('../db/models/authService')
const authRouter = require('./auth')
const usersRouter = require('./users')

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/users', authUserMiddleware, usersRouter)

module.exports = apiRouter
