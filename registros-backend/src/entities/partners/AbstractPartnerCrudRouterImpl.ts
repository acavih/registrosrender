import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { FeedbackMessage } from '../../types'
import AbstractPartnerCrudRouter from './AbstractPartnerCrudRouter'
import { IPartner } from './Partner'

export default class AbstractPartnerCrudRouterImpl extends AbstractPartnerCrudRouter {
  async listPartners (req: Request, res: Response) {
    const aa = await this.service.queryPartners(req)
    const { totalDocs, partnersList } = aa
    // console.log(aa)
    const status = httpStatus.OK
    res.status(status).json({
      message: 'Listado de socios',
      result: true,
      statusCode: status,
      payload: {
        list: partnersList,
        totalDocs
      }
    } as FeedbackMessage<{
      list: IPartner[],
      totalDocs: number
    }>)
  }

  async createPartner (req: Request, res: Response) {
    const status = httpStatus.CREATED
    res.status(status).json({
      message: 'Socio creado',
      result: true,
      statusCode: status,
      payload: await this.service.createPartner(req.body)
    } as FeedbackMessage<IPartner>)
  }

  async updatePartner (req: Request, res: Response) {
    const status = httpStatus.OK
    res.status(status).json({
      message: 'Socio actualizado',
      result: true,
      statusCode: status,
      payload: await this.service.updatePartner(req.params.id, req.body)
    } as FeedbackMessage<IPartner>)
  }

  async removePartner (req: Request, res: Response) {
    const status = httpStatus.OK
    res.status(status).json({
      message: 'Socio eliminado',
      result: true,
      statusCode: status,
      payload: await this.service.deletePartner(req.params.id)
    } as FeedbackMessage<IPartner>)
  }
}
