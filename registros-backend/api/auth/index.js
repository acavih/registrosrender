const CustomErrorBase = require("../../errors/CustomErrorBase")
const express = require('express')
const { authUser, getProfileFor, authUserMiddleware, changePassword, restorePassword } = require('../../db/models/authService')

const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
  try {
    const newUser = await authUser(req.body)
    res.status(201).json({
      message: 'Usuario creado correctamente',
      payload: newUser
    })
  } catch (error) {
    if (error instanceof CustomErrorBase) {
      return res.status(error.status).json({
        message: error.message
      })
    }
    console.log(error)
    res.status(500).json({
      message: 'Hubo un error interno'
    })
  }
})

authRouter.put('/changePassword', async (req, res) => {
  const { status, ...payload } = await changePassword(req.body)
  res.status(status).json(payload)
})

authRouter.put('/restorePassword', async (req, res) => {
  const { status, ...payload } = await restorePassword(req.body)
  res.status(status).json(payload)
})

authRouter.get('/profile', authUserMiddleware, async (req, res) => {
  try {
    res.json({
      message: 'Profile data',
      payload: await getProfileFor(req.headers.authorization)
    })
  } catch (error) {
    if (error instanceof CustomErrorBase) {
      return res.status(error.status).json({
        message: error.message
      })
    }
    console.log(error)
    res.status(500).json({
      message: 'Hubo un error interno'
    })
  }
})

authRouter.post('/logout', authUserMiddleware, async (req, res) => {
  try {
    res.json({ message: 'logout' })
  } catch (error) {
    if (error instanceof CustomErrorBase) {
      return res.status(error.status).json({
        message: error.message
      })
    }
    console.log(error)
    res.status(500).json({
      message: 'Hubo un error interno'
    })
  }
})

module.exports = authRouter
