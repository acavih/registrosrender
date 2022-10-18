import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import httpStatus from 'http-status'
import { ParsedQs } from 'qs'
import AbstractAuthUserRouter from './AbstractAuthUserRouter'
import { IUser } from './User'

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

  async profile (req: Request, res: Response) {
    const token = req.headers.authorization
    const user = await this.service.getUserFromToken(token)
    const { password, ...userInfo } = user as IUser
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'El usuario no se encontró',
        payload: null
      })
    }
    return res.status(httpStatus.OK).json({
      message: 'Usuario recuperado',
      payload: { user: userInfo }
    })
  }

  async listUsers(req: Request, res: Response) {
      const users = await this.service.getAllusers()
      res.status(httpStatus.OK).json({
        message: 'Listado de usuarios',
        payload: users
      })
  }
}
