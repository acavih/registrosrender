const express = require('express')
const { listPartners, getPartner } = require('../../db/models/partner/partnerService')

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

module.exports = partnersRouter
