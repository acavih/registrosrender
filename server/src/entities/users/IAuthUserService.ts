import { FeedbackMessage, PayloadGoodResult } from '../../../types'
import { IUser } from './User'

export interface IAuthUserService {
  hashPassword(password: string): Promise<string>
  userExists(email: string): Promise<IUser | null>

  signupUser(user: IUser): Promise<FeedbackMessage<any>>

  passwordsAreTheSame(password: string, hash: string): Promise<Boolean>
  getToken(issuer: string, payload: any): string

  signinUser(email: string, password: string): Promise<FeedbackMessage<PayloadGoodResult | null>>

  getUserFromToken(token?: string | undefined): Promise<IUser | null>
}
