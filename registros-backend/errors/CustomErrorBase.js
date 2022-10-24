module.exports = class CustomErrorBase extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}
