const express = require('express')
const { getUserAttentions, getAttentionsInRangeDate, createAttention, updateAttention } = require('../../db/models/attention/AttentionsService')

const attentionsRouter = express.Router()

attentionsRouter.get('/byUser/:user', async (req, res) => {
  const attentions = await getUserAttentions(req.params.user)
  res.json({
    message: 'User attentions',
    payload: attentions
  })
})

attentionsRouter.get('/byRange', async (req, res) => {
  const attentions = await getAttentionsInRangeDate(req.query)
  res.json({
    message: 'Attentions in range date',
    payload: attentions
  })
})

attentionsRouter.post('/', async (req, res) => {
  const attention = await createAttention(req.body)
  res.json({
    message: 'Atención creada',
    payload: attention
  })
})

attentionsRouter.put('/:id', async (req, res) => {
  const attention = await updateAttention(req.params.id, req.body)
  res.json({
    message: 'Atención actualizada',
    payload: attention
  })
})

module.exports = attentionsRouter
