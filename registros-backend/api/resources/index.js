const express = require('express')
const { listResources, createResource, updateResource } = require('../../db/models/resources/resourceService')

const resourceRouter = express.Router()

resourceRouter.get('/', async (req, res) => {
  const resources = await listResources()
  res.status(201).json({
    message: 'Todos los recursos',
    payload: resources
  })
})

resourceRouter.post('/', async (req, res) => {
  const newResource = await createResource(req.body)
  res.status(201).json({
    message: 'Recurso creado',
    payload: newResource
  })
})

resourceRouter.put('/:id', async (req, res) => {
  const updatedResource = await updateResource(req.params.id, req.body)
  res.status(200).json({
    message: 'Recurso actualizado',
    payload: updatedResource
  })
})

module.exports = resourceRouter
