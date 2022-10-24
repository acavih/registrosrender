const CustomErrorBase = require("./CustomErrorBase")

module.exports = class ForbiddenError extends CustomErrorBase {
  constructor() {
    super('No tienes permitido realizar esta acción', 403)
  }
}
