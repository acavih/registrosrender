const ResourceModel = require(".")

const resourceService = {
  async listResources() {
    const allResources = await ResourceModel.find({})
    return allResources
  },
  async createResource(payload) {
    const resource = await ResourceModel.create(payload)
    return resource
  },
  async updateResource(idResource, update) {
    const resource = await ResourceModel.findOneAndUpdate({
      _id: idResource
    }, { $set: update }, { returnOriginal: false })
    return resource
  }
}

module.exports = resourceService
