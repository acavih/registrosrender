const UserModel = require("./User")

const userService = {
  async listUsers() {
    return await UserModel.find({})
  }
}

module.exports = userService
