const express = require('express')
const { getUserAttentions } = require('../../db/models/attention/AttentionsService')

const attentionsRouter = express.Router()

attentionsRouter.get('/byUser/:user', async (req, res) => {
  const attentions = await getUserAttentions(req.params.user)
  res.json({
    message: 'User attentions',
    payload: attentions
  })
})

module.exports = attentionsRouter
