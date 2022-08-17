import { Request, Response } from 'express'
import { FeedbackMessage } from '../../../types'
import AbstractAttentionCrudRouter from './AbstractAttentionCrudRouter'

export default class AbstractAttentionCrudRouterImpl extends AbstractAttentionCrudRouter {
  async listResources (_req: Request, res: Response) {
    const resources = await this.service.listAllResources()
    res.status(200).json({
      message: 'Listado de recursos',
      result: true,
      statusCode: 200,
      payload: { resources }
    } as FeedbackMessage<any>)
  }

  async createOrFindResource (req: Request, res: Response) {
    const { name, type } = req.body
    const { status, resource } = await this.service.findOrCreateResource(name, type)

    res.status(status).json({
      message: status === 201 ? 'Recurso creado' : 'Este recurso ya estaba creado',
      result: true,
      statusCode: status,
      payload: { resource }
    } as FeedbackMessage<any>)
  }

  async updateResource (req: Request, res: Response) {
    const { status, resource } = await this.service.updateResource(req.params.id, req.body)

    res.status(status).json({
      message: status === 400 ? 'El recurso no se pudo actualizar debido a un conflicto' : 'Recurso actualizado correctamente',
      result: true,
      statusCode: status,
      payload: { resource }
    } as FeedbackMessage<any>)
  }
}
