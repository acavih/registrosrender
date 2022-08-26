import { Router, Request, Response} from 'express'
import ITestCrudService from './ITestCrudService'

export default abstract class AbstractTestCrudRouter {
  static prefixApiNS = '/enfermedades'
  router: Router
  service: ITestCrudService

  constructor(service: ITestCrudService) {
    const router = Router()
    this.service = service

    router.get('/:attentionId', this.listTestByAttention.bind(this) as any)
    router.post('/', this.createTest.bind(this) as any)
    router.put('/:id', this.modifyTest.bind(this) as any)
    router.delete('/:id', this.removeTest.bind(this) as any)

    this.router = router
  }

  abstract listTestByAttention(req: Request, res: Response): any
  abstract createTest(req: Request, res: Response): any
  abstract modifyTest(req: Request, res: Response): any
  abstract removeTest(req: Request, res: Response): any
}
