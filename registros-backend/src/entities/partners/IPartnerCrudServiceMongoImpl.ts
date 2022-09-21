import { Request } from 'express'
import lookupResourceAggregation from '../../utils/lookupResourceAggregation'
import { resourceCrudMongoServiceInstance } from '../resources'
import IPartnerCrudService from './IPartnerCrudService'
import Partner, { partnerQueryFields } from './Partner'
import { IPartner } from "registros-types";

export default class IPartnerCrudServiceMongoImpl implements IPartnerCrudService {
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

  async queryPartners (req: Request): Promise<{ partnersList: IPartner[], totalDocs: number }> {
    const { page = 1, itemsPerPage = 20, qUser = '' } = req.query
    const skip = (Number(page) - 1) * Number(itemsPerPage)

    let pattern = (qUser as string).replace(/\s/g, '.*')
    const specialCharacters = ['+', '/', '(', '[', ']', ')', '.', '^', '{', '}', '$']
    specialCharacters.forEach(char => {
      pattern = pattern.replace(new RegExp('\\' + char, 'g'), '\\' + char);
    })

    const aggregatesPipeline = [
      ...lookupResourceAggregation('sexo', true),
      ...lookupResourceAggregation('socioono', true),
      ...lookupResourceAggregation('ciudadresidencia', true),
      ...lookupResourceAggregation('nacionalidad', true),
      {
        $addFields: {
          qUser: {
            $concat: partnerQueryFields
          }
        }
      }
    ]

    aggregatesPipeline.push({
      $match: {
        qUser: { $regex: new RegExp(pattern, 'i') }
      }
    })

    aggregatesPipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: Number(itemsPerPage) }]
      }
    })

    const [aggregatePartners] = await Partner.aggregate(aggregatesPipeline)

    const totalDocs = aggregatePartners.metadata[0]?.total || 0

    const partnersList = aggregatePartners.data

    return { totalDocs, partnersList }
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
