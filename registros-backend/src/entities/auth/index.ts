import AbstractAuthUserRouterImpl from './AbstractAuthRouterImpl'
import { IAuthUserServiceMongoImpl } from './IAuthServiceMongoImpl'

export const authUserServiceMongoInstance = new IAuthUserServiceMongoImpl()
export const authUserRouterInstance = new AbstractAuthUserRouterImpl(authUserServiceMongoInstance)
