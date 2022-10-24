const CustomErrorBase = require("./CustomErrorBase")

module.exports = class BadCredentials extends CustomErrorBase {
  constructor() {
    super('Credenciales incorrectas', 401)
  }
}
