const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY || 'Hola mundo'

const userSchema = new mongoose.Schema({
  user: { type: String },
  password: { type: String }
}, {
  statics: {
    async checkPassword(password, hash) {
      return await bcryptjs.compare(password, hash)
    },
    getTokenPayloadFor({ user }) {
      return jsonwebtoken.sign({ user }, SECRET_KEY, {
        subject: user,
        expiresIn: '6h'
      })
    },
    tokenIsValid(token) {
      return jsonwebtoken.verify(token, SECRET_KEY)
    },
    async userFromToken(token) {
      const tokenDecoded = jsonwebtoken.decode(token)
      const user = await UserModel.findOne({ user: tokenDecoded.sub })
      return user
    }
  }
})

userSchema.pre('save', async function hashPassword() {
  console.log('hola desde el pre save')
  this.set('password', await bcryptjs.hash(this.get('password'), 8))
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel
