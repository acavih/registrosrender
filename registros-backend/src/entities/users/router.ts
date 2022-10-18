import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import User from "../auth/User";

const usersRouter = Router()

usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(httpStatus.OK).json({
    message: 'Listado de usuarios',
    payload: users
  })
})

export default usersRouter
