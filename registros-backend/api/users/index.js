const express = require('express')
const { listUsers, createUser, deleteUser } = require('../../db/models/userService')

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await listUsers()
  res.status(200).json({
    message: 'Listado de usuarios',
    payload: users
  })
})

usersRouter.post('/', async (req, res) => {
  const user = await createUser(req.body)
  res.status(200).json({
    message: 'Usuario creado',
    payload: user
  })
})

usersRouter.delete('/:id', async (req, res) => {
  await deleteUser(req.params.id)
  res.status(200).json({
    message: 'Usuario eliminado'
  })
})

module.exports = usersRouter
