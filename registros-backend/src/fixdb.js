db.members.update(
  { apellidos: { $exists: false } },
  { $set: { apellidos: '' } },
  { multi: true }
)

db.members.update(
  { nombre: { $exists: false } },
  { $set: { nombre: '' } },
  { multi: true }
)

db.members.update(
  { codigo: { $exists: false } },
  { $set: { codigo: '' } },
  { multi: true }
)

db.members.update(
  { telefono: { $exists: false } },
  { $set: { telefono: '' } },
  { multi: true }
)

db.members.update(
  { sipcard: { $exists: false } },
  { $set: { sipcard: '' } },
  { multi: true }
)

db.members.update(
  { correoelectronico: { $exists: false } },
  { $set: { correoelectronico: '' } },
  { multi: true }
)

// Arreglar socios con ese formato de fecha
db.members.find({
  fechanacimiento: new Date('1970-01-01')
})
