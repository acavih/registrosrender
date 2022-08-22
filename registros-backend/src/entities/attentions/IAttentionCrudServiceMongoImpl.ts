import IAttentionCrudService from './IAttentionCrudService'
import Attention from './Attention'
import { IAttention } from 'registros-types'

export default class IAttentionCrudServiceMongoImpl implements IAttentionCrudService {
  async listAttentionsInRangeDate (startDate: string, endDate: string): Promise<IAttention[]> {
    const attentions = await Attention.find({
      fechaatencion: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate({
      path: 'user',
      populate: ['sexo', 'nacionalidad', 'ciudadresidencia', 'socioono']
    })

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
        'lugaratencion'
      ])
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
