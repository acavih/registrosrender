import { IResource } from './Attention'

export default interface IAttentionCrudService {
  listAllResources(): Promise<IResource[]>
  findOrCreateResource(name: string, type: string): Promise<{ status: number, resource: IResource }>
  updateResource(id: string, updateInfo: IResource): Promise<{ status: number, resource: IResource }>
}
