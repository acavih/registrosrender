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
  codigo: { type: String },
  nombre: { type: String },
  apellidos: { type: String },
  fechanacimiento: { type: Date },
  sipcard: { type: String },
  correoelectronico: { type: String },
  telefono: { type: String },
  observaciones: { type: String },
  cosaspendientes: { type: String },
  sexo: { type: mongoose.Types.ObjectId, ref: 'resources' },
  socioono: { type: mongoose.Types.ObjectId, ref: 'resources' },
  nacionalidad: { type: mongoose.Types.ObjectId, ref: 'resources' },
  ciudadresidencia: { type: mongoose.Types.ObjectId, ref: 'resources' }
})

partnerSchema.virtual('edad')
  .get(function () {
    return this.fechanacimiento ? calcularEdad(this.fechanacimiento as any) : 'n/a'
  })

partnerSchema.set('toObject', { virtuals: true })
partnerSchema.set('toJSON', { virtuals: true })

export const Partner = mongoose.model('resources', partnerSchema)

export default Partner
