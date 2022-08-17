import IAttentionCrudService from './IAttentionCrudService'
import Attention, { IAttention } from './Attention'

export default class IAttentionCrudServiceMongoImpl implements IAttentionCrudService {
  async listAttentionsFor (partnerId: string): Promise<IAttention[]> {
    const attentions = await Attention.find({
      user: partnerId
    }).sort('-fechaatencion')
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
