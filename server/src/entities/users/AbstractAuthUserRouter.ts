import express, { Request, Response, Router } from 'express'
import { IAuthUserService } from './IAuthUserService'

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
}
