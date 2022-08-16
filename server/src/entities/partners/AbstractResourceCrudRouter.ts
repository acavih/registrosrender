import { Request, Response, Router } from 'express'
import IResourceCrudService from './IResourceCrudService'

export default abstract class AbstractResourceCrudRouter {
  static prefixApiNS = '/resources'
  router: Router
  service: IResourceCrudService

  constructor (service: IResourceCrudService) {
    const router = Router()
    this.service = service

    router.get('/', this.listResources.bind(this) as any)
    router.post('/', this.createOrFindResource.bind(this) as any)
    router.put('/:id', this.updateResource.bind(this) as any)

    this.router = router
  }

  abstract listResources(req: Request, res: Response): any
  abstract createOrFindResource(req: Request, res: Response): any
  abstract updateResource(req: Request, res: Response): any
}
