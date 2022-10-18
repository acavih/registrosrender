import IAttentionCrudService from './IAttentionCrudService'
import Attention from './Attention'
import { IAttention } from 'registros-types'

export default class IAttentionCrudServiceMongoImpl implements IAttentionCrudService {
  async listLastAttentions({ limit = 50, page = 1 }: any) : Promise<any> {
    const skip = (page - 1) * limit
    const attentions = await Attention.find({})
      .limit(50).skip(skip)
      .populate('user')
    const totalCountAttentions = await Attention.countDocuments()
    return {
      total: totalCountAttentions,
      attentions
    }
  }

  async listAttentionsInRangeDate (startDate: string, endDate: string): Promise<IAttention[]> {
    const attentions = await Attention.find({
      fechaatencion: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate({
      path: 'user',
      populate: ['sexo', 'nacionalidad', 'ciudadresidencia', 'socioono']
    }).populate({
      path: 'tests',
      populate: ['enfermedad']
    }).populate([
      'tipoaenciones',
      'Proyectos',
      'motivosatencion',
      'derivadoa',
      'derivadode',
      'formacion',
      'voluntariado',
      'lugaratencion'
    ])

    return attentions as any
  }

  async listAttentionsFor (partnerId: string): Promise<IAttention[]> {
    const attentions = await Attention.find({
      user: partnerId
    }).sort('-fechaatencion')
      .populate([
        'tipoaenciones',
        'Proyectos',
        'motivosatencion',
        'derivadoa',
        'derivadode',
        'formacion',
        'voluntariado',
        'lugaratencion',
        'tests'
      ]).populate({
        path: 'tests',
        populate: ['enfermedad']
      })
    return attentions as any
  }

  async createAttentionFor (partnerId: string, attentionData: IAttention): Promise<IAttention> {
    const attention = await Attention.create({
      ...attentionData,
      user: partnerId
    })
    return attention as any
  }

  async updateAttention (attentionId: string, update: IAttention): Promise<any> {
    await Attention.findOneAndUpdate({
      _id: attentionId
    }, { $set: update })
  }

  async removeAttention (attentionId: string): Promise<any> {
    await Attention.findOneAndRemove({ _id: attentionId })
  }
}
