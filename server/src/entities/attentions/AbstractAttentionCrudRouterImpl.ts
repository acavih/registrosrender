import { Request, Response } from 'express'
import { FeedbackMessage } from '../../../types'
import AbstractAttentionCrudRouter from './AbstractAttentionCrudRouter'

export default class AbstractAttentionCrudRouterImpl extends AbstractAttentionCrudRouter {
  async listAttentionsFor (req: Request, res: Response) {
    const attentions = await this.service.listAttentionsFor(req.params.userId)
    res.status(200).json({
      message: 'Listado de atenciones',
      result: true,
      statusCode: 200,
      payload: { attentions }
    } as FeedbackMessage<any>)
  }

  async createAttentionsFor (req: Request, res: Response) {
    const update = req.body
    const attention = await this.service.createAttentionFor(req.params.userId, update)
    const status = 201

    res.status(status).json({
      message: status === 201 ? 'Recurso creado' : 'Este recurso ya estaba creado',
      result: true,
      statusCode: status,
      payload: { attention }
    } as FeedbackMessage<any>)
  }

  async updateAttention (req: Request, res: Response) {
    await this.service.updateAttention(req.params.id, req.body)

    const status = 201

    res.status(status).json({
      message: 'Atencion actualizada correctamente',
      result: true,
      statusCode: status,
      payload: { }
    } as FeedbackMessage<any>)
  }

  async removeAttention (req: Request, res: Response) {
    await this.service.removeAttention(req.params.id)

    const status = 201

    res.status(status).json({
      message: 'Atención eliminada correctamente',
      result: true,
      statusCode: status,
      payload: {}
    } as FeedbackMessage<any>)
  }
}
