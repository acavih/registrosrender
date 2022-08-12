import { IResource } from './Resource'

export default interface IResourceCrudService {
  listAllResources(): Promise<IResource[]>
  findOrCreateResource(name: string, type: string): Promise<IResource>
  updateResource(id: string, updateInfo: IResource): Promise<IResource>
}
