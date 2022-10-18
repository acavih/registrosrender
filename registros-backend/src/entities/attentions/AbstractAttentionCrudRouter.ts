import { Request, Response, Router } from 'express'
import IAttentionCrudService from './IAttentionCrudService'

export default abstract class AbstractAttentionCrudRouter {
  static prefixApiNS = '/attentions'
  router: Router
  service: IAttentionCrudService

  constructor (service: IAttentionCrudService) {
    const router = Router()
    this.service = service

    router.get('/last', this.listLastAttentions.bind(this) as any)
    router.get('/dataset', this.listAttentionsDataset.bind(this) as any)
    router.get('/:userId', this.listAttentionsFor.bind(this) as any)
    router.post('/:userId', this.createAttentionsFor.bind(this) as any)
    router.put('/:id', this.updateAttention.bind(this) as any)
    router.delete('/:id', this.removeAttention.bind(this) as any)

    this.router = router
  }

  abstract listLastAttentions(req: Request, res: Response): any
  abstract listAttentionsFor(req: Request, res: Response): any
  abstract createAttentionsFor(req: Request, res: Response): any
  abstract updateAttention(req: Request, res: Response): any
  abstract removeAttention(req: Request, res: Response): any
  abstract listAttentionsDataset(req: Request, res: Response): any
}
