import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { jwtSignOptionsOf, JWT_SECRET_KEY } from '../../vars'
import { FeedbackMessage, PayloadGoodResult } from '../../types'
import { IAuthUserService } from './IAuthUserService'
import User, { IUser } from './User'

export class IAuthUserServiceMongoImpl implements IAuthUserService {
  async getUserFromToken (token?: string | undefined): Promise<IUser | null> {
    if (!token) {
      return null
    }
    const decoded = jsonwebtoken.decode(token.replace('Bearer ', '')) as JwtPayload
    const user = await this.userExists(decoded.iss!)
    return user as IUser
  }

  async hashPassword (password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 8)
    return hash
  }

  async userExists (email: string): Promise<IUser | null> {
    const user = await User.findOne({ user: email })
    return user as IUser
  }

  async signupUser (user: IUser): Promise<FeedbackMessage<any>> {
    const existingUser = await this.userExists(user.user)
    if (existingUser !== null) {
      return {
        message: 'El usuario existe',
        statusCode: httpStatus.CONFLICT,
        payload: null,
        result: false
      }
    }
    user.password = await this.hashPassword(user.password)
    const userCreated = await User.create(user)
    return {
      message: 'El usuario se ha creado con éxito',
      statusCode: httpStatus.CREATED,
      payload: userCreated,
      result: true
    }
  }

  async passwordsAreTheSame (password: string, hash: string): Promise<Boolean> {
    const isTheSame = await bcrypt.compare(password, hash)
    return isTheSame
  }

  getToken (issuer: string, payload: any): string {
    const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, jwtSignOptionsOf(issuer))
    return token
  }

  async signinUser (email: string, password: string): Promise<FeedbackMessage<PayloadGoodResult | null>> {
    const user = await this.userExists(email)

    const badResponse = {
      message: 'Las credenciales no son correctas',
      statusCode: httpStatus.UNAUTHORIZED,
      result: false,
      payload: null
    }

    if (!user) {
      return badResponse
    }

    const passwordsAreTheSame = await this.passwordsAreTheSame(password, user.password)

    if (!passwordsAreTheSame) {
      return badResponse
    }

    return {
      result: true,
      message: 'Acceso exitoso',
      statusCode: httpStatus.CREATED,
      payload: {
        token: this.getToken(user.user, {
          user: user.user!
        })
      }
    }
  }
}
