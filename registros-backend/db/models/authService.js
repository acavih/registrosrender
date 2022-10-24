const ForbiddenError = require("../../errors/ForbiddenError")
const UserModel = require("./User")

const authService = {
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
    const error = new ForbiddenError()
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(error.status).json({
        message: error.message
      })
    }
    const tokenIsValid = UserModel.tokenIsValid(authHeader)
    if (!tokenIsValid) {
      return res.status(error.status).json({
        message: error.message
      })
    }
    next()
  },
  async getProfileFor(token) {
    return await UserModel.userFromToken(token)
  }
}

module.exports = authService
