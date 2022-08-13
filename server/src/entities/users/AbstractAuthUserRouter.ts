import express, { NextFunction, Request, Response, Router } from 'express'
import httpStatus from 'http-status'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET_KEY, JWT_SUBJECT } from '../../vars'
import { IAuthUserService } from './IAuthUserService'
import User from './User'

export default abstract class AbstractAuthUserRouter {
  static prefixApiNS = '/auth'

  service: IAuthUserService
  router: Router

  constructor (service: IAuthUserService) {
    this.service = service
    const router = express.Router()

    router.post('/signin', this.signin.bind(this) as any)
    router.post('/signup', this.signup.bind(this) as any)
    router.get('/profile', this.profile.bind(this) as any)
    router.post('/logout', this.logout.bind(this) as any)

    this.router = router
  }

  abstract signin(req: Request, res: Response): any
  abstract signup(req: Request, res: Response): any
  abstract profile(req: Request, res: Response): any
  logout (_req: Request, res: Response) {
    res.status(200).end()
  }

  static async authUser (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(httpStatus.FORBIDDEN).json({
          message: 'Tienes que estar autenticado para realizar esta acción'
        })
      }

      const decodedToken = jsonwebtoken.verify(token, JWT_SECRET_KEY) as JwtPayload
      if (decodedToken.sub !== JWT_SUBJECT) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: 'El token no es válido'
        })
      }

      const user = await User.findOne({ user: decodedToken.iss })
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: 'El usuario correspondiente al token no es válido'
        })
      }

      next()
    } catch (error: any) {
      console.error(error)
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: error.message
      })
    }
  }
}
