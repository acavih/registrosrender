import mongoose from 'mongoose'
import calcularEdad from '../../utils/calcularEdad'
import { IResource } from '../resources/Resource'

export interface IPartner {
  codigo: String,
  nombre: String,
  apellidos: String,
  fechanacimiento: Date,
  sipcard: String,
  correoelectronico: String,
  telefono: String,
  observaciones: String,
  cosaspendientes: String,
  sexo: IResource,
  socioono: IResource,
  nacionalidad: IResource,
  ciudadresidencia: IResource
}

const partnerSchema = new mongoose.Schema({
  codigo: { default: '', type: String },
  nombre: { default: '', type: String },
  apellidos: { default: '', type: String },
  fechanacimiento: { type: Date },
  sipcard: { default: '', type: String },
  correoelectronico: { default: '', type: String },
  telefono: { default: '', type: String },
  observaciones: { default: '', type: String },
  cosaspendientes: { default: '', type: String },
  sexo: { type: mongoose.Types.ObjectId, ref: 'resources' },
  socioono: { type: mongoose.Types.ObjectId, ref: 'resources' },
  nacionalidad: { type: mongoose.Types.ObjectId, ref: 'resources' },
  ciudadresidencia: { type: mongoose.Types.ObjectId, ref: 'resources' }
}, { toJSON: { virtuals: true } })

partnerSchema.virtual('edad')
  .get(function () {
    return this.fechanacimiento ? calcularEdad(this.fechanacimiento as any) : 'n/a'
  })

partnerSchema.set('toObject', { virtuals: true })
partnerSchema.set('toJSON', { virtuals: true })

export const Partner = mongoose.model('members', partnerSchema)

export default Partner

export const partnerQueryFields = [
  '$codigo', ' ',
  '$nombre', ' ',
  '$apellidos', ' ',
  '$telefono', ' ', '$sipcard', ' ', '$correoelectronico'
]
