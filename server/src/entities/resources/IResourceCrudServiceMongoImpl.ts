import IResourceCrudService from './IResourceCrudService'
import Resource, { IResource } from './Resource'

export default class IResourceCrudServiceMongoImpl implements IResourceCrudService {
  async listAllResources (): Promise<IResource[]> {
    return await Resource.find()
  }

  async findOrCreateResource (name: string, type: string): Promise<IResource> {
    let resourceQueried = await Resource.findOne({ name, type })

    if (!resourceQueried) {
      resourceQueried = await Resource.create({ name, type })
    }

    return resourceQueried as IResource
  }

  async updateResource (id: string, updateInfo: IResource): Promise<IResource> {
    return await Resource.findOneAndUpdate({
      _id: id
    }, { $set: updateInfo }, { new: true }) as IResource
  }
}
