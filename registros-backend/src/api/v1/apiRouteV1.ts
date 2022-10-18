import express from 'express'
import { attentionCrudRouterImplInstance } from '../../entities/attentions'
import AbstractAttentionCrudRouter from '../../entities/attentions/AbstractAttentionCrudRouter'
import { partnerCrudRouterImplInstance } from '../../entities/partners'
import AbstractPartnerCrudRouter from '../../entities/partners/AbstractPartnerCrudRouter'
import { resouceCrudRouterImplInstance } from '../../entities/resources'
import AbstractResourceCrudRouter from '../../entities/resources/AbstractResourceCrudRouter'
import { testCrudRouterImplInstance } from '../../entities/tests'
import AbstractTestCrudRouter from '../../entities/tests/AbstractTestCrudRouter'
import { authUserRouterInstance } from '../../entities/auth'
import AbstractAuthUserRouter from '../../entities/auth/AbstractAuthRouter'
import usersRouter from '../../entities/users/router'

const apiRouteV1 = express.Router()

apiRouteV1.use(AbstractAuthUserRouter.prefixApiNS, authUserRouterInstance.router)
apiRouteV1.use(AbstractResourceCrudRouter.prefixApiNS, AbstractAuthUserRouter.authUser, resouceCrudRouterImplInstance.router)
apiRouteV1.use(AbstractPartnerCrudRouter.prefixApiNS, AbstractAuthUserRouter.authUser, partnerCrudRouterImplInstance.router)
apiRouteV1.use(AbstractAttentionCrudRouter.prefixApiNS, AbstractAuthUserRouter.authUser, attentionCrudRouterImplInstance.router)
apiRouteV1.use(AbstractTestCrudRouter.prefixApiNS, AbstractAuthUserRouter.authUser, testCrudRouterImplInstance.router)
apiRouteV1.use('/users', AbstractAuthUserRouter.authUser, usersRouter)

export default apiRouteV1
