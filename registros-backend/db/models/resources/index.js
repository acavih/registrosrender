const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, default: '' },
  archived: { type: Boolean, default: false }
})

const ResourceModel = mongoose.model('resources', resourceSchema)

module.exports = ResourceModel
