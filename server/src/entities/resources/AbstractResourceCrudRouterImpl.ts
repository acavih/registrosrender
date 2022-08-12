import { Request, Response } from 'express'
import { FeedbackMessage } from '../../../types'
import AbstractResourceCrudRouter from './AbstractResourceCrudRouter'

export default class AbstractResourceCrudRouterImpl extends AbstractResourceCrudRouter {
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
    const resource = await this.service.findOrCreateResource(name, type)

    res.status(201).json({
      message: 'Recurso creado',
      result: true,
      statusCode: 201,
      payload: { resource }
    } as FeedbackMessage<any>)
  }

  async updateResource (req: Request, res: Response) {
    const resource = await this.service.updateResource(req.params.id, req.body)

    res.status(201).json({
      message: 'Recurso actualizado',
      result: true,
      statusCode: 200,
      payload: { resource }
    } as FeedbackMessage<any>)
  }
}
