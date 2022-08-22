import mongoose from 'mongoose'

export interface IResource {
  type: String,
  name: String,
  archived: Boolean
}

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, default: '' },
  archived: { type: Boolean, default: false }
})

export const Resource = mongoose.model('resources', resourceSchema)

export default Resource
