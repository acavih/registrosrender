const express = require('express')
const { listPartners, getPartner, createPartner, updatePartner } = require('../../db/models/partner/partnerService')

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
    message: 'Socio actualizado'
  })
})

module.exports = partnersRouter
