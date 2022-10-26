const UserModel = require("./User")

const userService = {
  async listUsers() {
    return await UserModel.find({})
  },
  async createUser(data) {
    return await UserModel.create({
      ...data
    })
  }
}

module.exports = userService
