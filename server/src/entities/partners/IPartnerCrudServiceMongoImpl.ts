import IResourceCrudService from './IPartnerCrudService'
import Partner, { IPartner } from './Partner'

export default class IPartnerCrudServiceMongoImpl implements IResourceCrudService {
  async getTotalPartnersCount (filter: any): Promise<any> {
    const totalDocs = await Partner.countDocuments()
    return totalDocs
  }

  async queryPartners (): Promise<IPartner[]> {
    const partners = await Partner.find({}).limit(20)
    return partners as any[]
  }

  async createPartner (partnerData: IPartner): Promise<IPartner> {
    const partnerCreated = await Partner.create(partnerData)
    return partnerCreated as any
  }

  async updatePartner (id: string, partnerData: IPartner) {
    await Partner.findOneAndUpdate({
      _id: id
    }, { $set: partnerData })
  }

  async deletePartner (id: string) {
    await Partner.findOneAndRemove({ _id: id })
  }
}
