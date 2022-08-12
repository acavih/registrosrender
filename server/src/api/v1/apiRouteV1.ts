import express from 'express'
import { resouceCrudRouterImplInstance } from '../../entities/resources'
import AbstractResourceCrudRouter from '../../entities/resources/AbstractResourceCrudRouter'
import { authUserRouterInstance } from '../../entities/users'
import AbstractAuthUserRouter from '../../entities/users/AbstractAuthUserRouter'

const apiRouteV1 = express.Router()

apiRouteV1.use(AbstractAuthUserRouter.prefixApiNS, authUserRouterInstance.router)
apiRouteV1.use(AbstractResourceCrudRouter.prefixApiNS, resouceCrudRouterImplInstance.router)

export default apiRouteV1
