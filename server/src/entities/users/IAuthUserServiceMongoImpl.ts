import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jsonwebtoken from 'jsonwebtoken'
import { jwtSignOptionsOf, JWT_SECRET_KEY } from '../../vars'
import { IAuthUserService } from './IAuthUserService'
import User, { IUser, IUserDocument } from './User'

export class IAuthUserServiceMongoImpl implements IAuthUserService {
  async hashPassword (password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 8)
    return hash
  }

  async userExists (email: string): Promise<IUser | null> {
    const user = await User.findOne({ email })
    return user as IUser
  }

  async signupUser (user: IUser): Promise<IUserDocument | null> {
    const existingUser = await this.userExists(user.user)
    if (existingUser !== null) {
      return null
    }
    user.password = await this.hashPassword(user.password)
    const userCreated = await User.create(user)
    return userCreated as IUserDocument
  }

  async passwordsAreTheSame (password: string, hash: string): Promise<Boolean> {
    const isTheSame = await bcrypt.compare(password, hash)
    return isTheSame
  }

  getToken (issuer: string, payload: any): string {
    const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, jwtSignOptionsOf(issuer))
    return token
  }

  async signinUser (email: string, password: string): Promise<PayloadGoodResult | FeedbackMessage> {
    const user = await this.userExists(email)

    if (!user || !this.passwordsAreTheSame(password, user.password)) {
      return {
        message: 'Las credenciales no son correctas',
        statusCode: httpStatus.UNAUTHORIZED
      } as FeedbackMessage
    }

    return {
      token: this.getToken(user.user, {
        user: user.user!
      })
    }
  }
}
