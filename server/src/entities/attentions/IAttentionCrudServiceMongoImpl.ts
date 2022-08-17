import IAttentionCrudService from './IAttentionCrudService'
import Resource, { IResource } from './Attention'

export default class IAttentionCrudServiceMongoImpl implements IAttentionCrudService {
  async listAllResources (): Promise<IResource[]> {
    return await Resource.find().sort('type name')
  }

  async findOrCreateResource (name: string, type: string): Promise<{status: number, resource: IResource}> {
    let resourceQueried = await Resource.findOne({ name, type })
    let status = 200

    if (!resourceQueried) {
      resourceQueried = await Resource.create({ name, type })
      status = 201
    }

    return {
      status,
      resource: resourceQueried as IResource
    }
  }

  async updateResource (id: string, updateInfo: IResource): Promise<{ status: number, resource: IResource }> {
    const { type, name } = updateInfo

    const existingResource = await Resource.findOne({ name, type })
    const isArchiving = existingResource !== null && updateInfo.archived !== (existingResource as any).archived
    if (existingResource && !isArchiving) {
      return {
        status: 400,
        resource: updateInfo
      }
    }

    return {
      status: 200,
      resource: await Resource.findOneAndUpdate({
        _id: id
      }, { $set: updateInfo }, { new: true }) as IResource
    }
  }
}
