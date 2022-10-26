const UserModel = require("./User")

const userService = {
  async listUsers() {
    return await UserModel.find({})
  },
  async createUser(data) {
    return await UserModel.create({
      ...data
    })
  },
  async deleteUser(userId) {
    return await UserModel.findOneAndRemove({_id: userId})
  }
}

module.exports = userService
