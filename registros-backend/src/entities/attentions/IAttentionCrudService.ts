import { IAttention } from 'registros-types'

export default interface IAttentionCrudService {
  listAttentionsFor(partnerId: string): Promise<IAttention[]>
  createAttentionFor(partnerId: string, attentionData: IAttention): Promise<IAttention>
  updateAttention(attentionId: string, update: IAttention): Promise<any>
  removeAttention(attentionId: string): Promise<any>
  listAttentionsInRangeDate(startDate: string, endDate: string): Promise<IAttention[]>
  listLastAttentions(params: any): Promise<any>
}
