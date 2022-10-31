const express = require('express')
const { getUserAttentions, getAttentionsInRangeDate } = require('../../db/models/attention/AttentionsService')

const attentionsRouter = express.Router()

attentionsRouter.get('/byUser/:user', async (req, res) => {
  const attentions = await getUserAttentions(req.params.user)
  res.json({
    message: 'User attentions',
    payload: attentions
  })
})

attentionsRouter.get('/byRange', async (req, res) => {
  const attentions = await getAttentionsInRangeDate()
  res.json({
    message: 'Attentions in range date',
    payload: attentions
  })
})

module.exports = attentionsRouter
