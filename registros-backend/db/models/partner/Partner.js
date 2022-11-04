const mongoose = require('mongoose')
const calcularEdad = require('../../../utils/calcularEdad')

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
  ciudadresidencia: { type: mongoose.Types.ObjectId, ref: 'resources' },
  howDidKnowUs: { type: mongoose.Types.ObjectId, ref: 'resources' }
})

partnerSchema.virtual('edad')
  .get(function () {
    return this.fechanacimiento ? calcularEdad(this.fechanacimiento) : 'n/a'
  })

partnerSchema.set('toObject', { virtuals: true })
partnerSchema.set('toJSON', { virtuals: true })

const Partner = mongoose.model('members', partnerSchema)

module.exports = Partner
