import { Request } from 'express'
import { resourceCrudMongoServiceInstance } from '../resources'
import IResourceCrudService from './IPartnerCrudService'
import Partner, { IPartner } from './Partner'

export default class IPartnerCrudServiceMongoImpl implements IResourceCrudService {
  async setDefaultsToPartnerIfNecessary (partner: IPartner): Promise<IPartner> {
    if (!partner.sexo) {
      const { resource } = await resourceCrudMongoServiceInstance.findOrCreateResource('NS/NC', 'sexos')
      partner.sexo = resource
    }

    if (!partner.ciudadresidencia) {
      const { resource } = await resourceCrudMongoServiceInstance.findOrCreateResource('NS/NC', 'residencias')
      partner.ciudadresidencia = resource
    }

    if (!partner.nacionalidad) {
      const { resource } = await resourceCrudMongoServiceInstance.findOrCreateResource('NS/NC', 'nacionalidads')
      partner.nacionalidad = resource
    }

    if (!partner.socioono) {
      const { resource } = await resourceCrudMongoServiceInstance.findOrCreateResource('NS/NC', 'socioonos')
      partner.socioono = resource
    }

    return partner as any
  }

  async getTotalPartnersCount (filter: any): Promise<any> {
    const totalDocs = await Partner.countDocuments()
    return totalDocs
  }

  async queryPartners (req: Request): Promise<IPartner[]> {
    console.log(req.query)
    const { page = 1, itemsPerPage = 20 } = req.query
    const skip = (Number(page) - 1) * Number(itemsPerPage)
    const partners = await Partner.find({})
      .skip(skip).limit(Number(itemsPerPage))
      .populate(['sexo', 'socioono', 'ciudadresidencia', 'nacionalidad'])
    return partners as any[]
  }

  async createPartner (partnerData: IPartner): Promise<IPartner> {
    const partnerCreated = await Partner.create(await this.setDefaultsToPartnerIfNecessary(partnerData))
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
