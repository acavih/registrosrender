import { IUser } from './User'

export interface IAuthUserService {
  hashPassword(password: string): Promise<string>
  userExists(email: string): Promise<IUser | null>

  signupUser(user: IUser): Promise<IUser | null>

  passwordsAreTheSame(password: string, hash: string): Promise<Boolean>
  getToken(issuer: string, payload: any): string

  signinUser(email: string, password: string): Promise<PayloadGoodResult | FeedbackMessage>
}
