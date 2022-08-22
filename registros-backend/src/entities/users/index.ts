import AbstractAuthUserRouterImpl from './AbstractAuthUserRouterImpl'
import { IAuthUserServiceMongoImpl } from './IAuthUserServiceMongoImpl'

export const authUserServiceMongoInstance = new IAuthUserServiceMongoImpl()
export const authUserRouterInstance = new AbstractAuthUserRouterImpl(authUserServiceMongoInstance)
