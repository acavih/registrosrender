const express = require('express')
const { listPartners, getPartner, createPartner, updatePartner, deletePartner } = require('../../db/models/partner/partnerService')

const partnersRouter = express.Router()

partnersRouter.get('/', async (req, res) => {
  const partners = await listPartners(req.query)
  res.json({
    message: 'Listado de socios',
    payload: partners
  })
})

partnersRouter.get('/:id', async (req, res) => {
  const partners = await getPartner(req.params.id)
  res.json({
    message: 'Datos del socio',
    payload: partners
  })
})

partnersRouter.post('/', async (req, res) => {
  const partner = await createPartner(req.body)
  res.json({
    message: 'Crear socio',
    payload: partner
  })
})

partnersRouter.put('/:id', async (req, res) => {
  await updatePartner(req.params.id, req.body)
  res.json({
    message: 'Socio actualizado',
    payload: await getPartner(req.params.id)
  })
})

partnersRouter.delete('/:id', async (req, res) => {
  await deletePartner(req.params.id)
  res.status(200).json({
    message: 'El socio se eliminó con éxito'
  })
})

module.exports = partnersRouter
