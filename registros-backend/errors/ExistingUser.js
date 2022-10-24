const CustomErrorBase = require("./CustomErrorBase")

module.exports = class BadCredentials extends CustomErrorBase {
  constructor() {
    super('Usuario existente', 409)
  }
}
