import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import User from "../auth/User";
import bcrypt from 'bcrypt'

const usersRouter = Router()

usersRouter.get('/', async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(httpStatus.OK).json({
    message: 'Listado de usuarios',
    payload: users
  })
})

usersRouter.post('/', async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Los datos están mal rellenados'
    })
  }
  const user = await User.create({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 8)
  })
  res.status(httpStatus.CREATED).json({
    message: 'Usuario creado',
    payload: user
  })
})

usersRouter.post('/changePassword', async (req: Request, res: Response) => {
  await User.findOneAndUpdate({user: req.query.user}, {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 8)
  })
  res.status(httpStatus.CREATED).json({
    message: 'La contraseñá se actualizó correctamente'
  })
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  await User.findOneAndRemove({ _id: req.params._id })
  res.status(httpStatus.CREATED).json({
    message: 'El usuario se eliminó con éxito'
  })
})

export default usersRouter
