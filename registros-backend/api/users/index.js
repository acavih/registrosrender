const express = require('express')
const { listUsers } = require('../../db/models/userService')

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await listUsers()
  res.status(200).json({
    message: 'Listado de usuarios',
    payload: users
  })
})

module.exports = usersRouter
