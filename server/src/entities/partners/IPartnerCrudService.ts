import { Request } from 'express'
import { IPartner } from './Partner'

export default interface IResourceCrudService {
  queryPartners(req: Request): Promise<IPartner[]>
  createPartner(partnerData: IPartner): Promise<IPartner>
  updatePartner(id: string, partnerData: IPartner): Promise<any>
  deletePartner(id: string): Promise<any>
  getTotalPartnersCount(filter: any): Promise<any>
  setDefaultsToPartnerIfNecessary(partner: IPartner): Promise<IPartner>
}
