import mongoose from 'mongoose'
import { IAttention } from 'registros-types'
const attentionSchema = new mongoose.Schema<IAttention>({
  comentario: { type: String },
  fechaatencion: { type: Date },
  tipoaenciones: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  Proyectos: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  motivosatencion: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  derivadoa: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  derivadode: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  formacion: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  voluntariado: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  diagnosticos: [{ type: mongoose.Types.ObjectId, ref: 'diagnosticos' }],
  lugaratencion: { type: mongoose.Types.ObjectId, ref: 'resources', default: null },
  cosaspendientes: { type: String, default: '' },
  fechacosaspendientes: { type: Date },
  user: { type: mongoose.Types.ObjectId, ref: 'members' },
  archived: { type: Boolean, default: false }
})

export const Attention = mongoose.model('attentions', attentionSchema)

export default Attention
