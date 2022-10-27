const express = require('express')
const { authUserMiddleware } = require('../db/models/authService')
const authRouter = require('./auth')
const partnersRouter = require('./partners')
const resourceRouter = require('./resources')
const usersRouter = require('./users')

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/users', authUserMiddleware, usersRouter)
apiRouter.use('/resources', authUserMiddleware, resourceRouter)
apiRouter.use('/partners', authUserMiddleware, partnersRouter)

module.exports = apiRouter
