import { Request, Response } from 'express'
import AbstractAuthUserRouter from './AbstractAuthUserRouter'

export default class AbstractAuthUserRouterImpl extends AbstractAuthUserRouter {
  async signin (req: Request, res: Response) {
    const feedback = await this.service.signinUser(req.body.username, req.body.password)
    res.status(feedback.statusCode).json({
      message: feedback.message,
      payload: feedback.payload
    })
  }

  async signup (req: Request, res: Response) {
    const feedback = await this.service.signupUser(req.body)
    res.status(feedback.statusCode).json({
      message: feedback.message,
      payload: feedback.payload
    })
  }
}
