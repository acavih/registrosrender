import AbstractPartnerCrudImpl from './AbstractPartnerCrudRouterImpl'
import IPartnerCrudImpl from './IPartnerCrudServiceMongoImpl'

export const partnerCrudMongoServiceInstance = new IPartnerCrudImpl()
export const partnerCrudRouterImplInstance = new AbstractPartnerCrudImpl(partnerCrudMongoServiceInstance)
