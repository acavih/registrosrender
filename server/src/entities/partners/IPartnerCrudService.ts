import { IPartner } from './Partner'

export default interface IResourceCrudService {
  queryPartners(): Promise<IPartner[]>
  createPartner(partnerData: IPartner): Promise<IPartner>
  updatePartner(id: string, partnerData: IPartner): Promise<any>
  deletePartner(id: string): Promise<any>
  getTotalPartnersCount(filter: any): Promise<any>
}
