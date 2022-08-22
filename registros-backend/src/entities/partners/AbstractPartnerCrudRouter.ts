import { Request, Response, Router } from 'express'
import IPartnerCrudService from './IPartnerCrudService'

export default abstract class AbstractPartnerCrudRouter {
  static prefixApiNS = '/partners'
  router: Router
  service: IPartnerCrudService

  constructor (service: IPartnerCrudService) {
    const router = Router()
    this.service = service

    router.get('/', this.listPartners.bind(this) as any)
    router.post('/', this.createPartner.bind(this) as any)
    router.put('/:id', this.updatePartner.bind(this) as any)
    router.delete('/:id', this.removePartner.bind(this) as any)

    this.router = router
  }

  abstract listPartners(req: Request, res: Response): any
  abstract createPartner(req: Request, res: Response): any
  abstract updatePartner(req: Request, res: Response): any
  abstract removePartner(req: Request, res: Response): any
}
