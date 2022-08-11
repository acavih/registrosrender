import express from 'express'
import { authUserRouterInstance } from '../../entities/users'
import AbstractAuthUserRouter from '../../entities/users/AbstractAuthUserRouter'

const apiRouteV1 = express.Router()

apiRouteV1.use(AbstractAuthUserRouter.prefixApiNS, authUserRouterInstance.router)

export default apiRouteV1
