import mongoose from 'mongoose'
import { IResource } from "registros-types";

const resourceSchema = new mongoose.Schema<IResource>({
  type: { type: String, required: true },
  name: { type: String, default: '' },
  archived: { type: Boolean, default: false }
})

export const Resource = mongoose.model('resources', resourceSchema)

export default Resource
