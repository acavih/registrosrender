const ForbiddenError = require("../../errors/ForbiddenError")
const BadCredentials = require("../../errors/BadCredentialsError")
const UserModel = require("./User")
const bcryptjs = require('bcryptjs')

const authService = {
  async changePassword(payload) {
    const existingUser = await UserModel.findOne({ user: payload.user })
    if (!existingUser) {
      return {
        status: 404,
        message: 'El usuario no existe'
      }
    }

    const equalPasswords = await UserModel.checkPassword(payload.currentPassword, existingUser.password)
    if (!equalPasswords) {
      return {
        status: 401,
        message: 'Las contraseñas no son iguales'
      }
    }

    const hashPassword = await bcryptjs.hash(payload.newPassword, 8)

    await UserModel.updateOne({ user: payload.user }, {
      $set: { password: hashPassword }
    })

    return {
      status: 200,
      message: 'Contraseña cambiada correctamente'
    }
  },
  async restorePassword(payload) {
    console.log(payload)

    const existingUser = await UserModel.findOne({ _id: payload.user })
    if (!existingUser) {
      return {
        status: 404,
        message: 'El usuario no existe'
      }
    }

    const hashPassword = await bcryptjs.hash(payload.newPassword || 'acavih', 8)

    await UserModel.updateOne({ _id: payload.user }, {
      $set: { password: hashPassword }
    })

    return {
      status: 200,
      message: 'Contraseña restablecida correctamente'
    }
  },
  async createUser(payload) {
    const existingUser = await UserModel.findOne({
      user: payload.user
    })

    if (existingUser) {
      throw new existingUser()
    }

    const user = await UserModel.create(payload)

    return user
  },
  async authUser(payload) {
    const existingUser = await UserModel.findOne({
      user: payload.user
    })

    if (!existingUser) {
      throw new BadCredentials()
    }

    const equalPasswords = await UserModel.checkPassword(payload.password, existingUser.password)

    if (equalPasswords !== true) {
      throw new BadCredentials()
    }

    return {
      user: existingUser,
      token: UserModel.getTokenPayloadFor(existingUser)
    }
  },
  async authUserMiddleware(req, res, next) {
    try {
      const error = new ForbiddenError()
      const authHeader = req.headers['authorization']
      if (!authHeader) {
        return res.status(error.status).json({
          message: error.message
        })
      }
      const tokenIsValid = UserModel.tokenIsValid(authHeader.replace('Bearer ', ''))
      if (!tokenIsValid) {
        return res.status(error.status).json({
          message: error.message
        })
      }
      next()
    } catch (error) {
      console.log(error)
      res.status(500).end('No ha sido posible comprobar el token')
    }
  },
  async getProfileFor(token) {
    return await UserModel.userFromToken(token.replace('Bearer ', ''))
  }
}

module.exports = authService
