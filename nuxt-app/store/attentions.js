export const state = () => ({
  attentions: []
})

/**
* @type {import('vuex').GetterTree<ReturnType<typeof state>>, any>}
*/
export const getters = {
}

/**
* @type {import('vuex').MutationTree<ReturnType<typeof state>>>}
*/
export const mutations = {
  attentions(state, attentions) {
    state.attentions = attentions
  },
  attention(state, attention) {
    state.attentions = [attention, ...state.attentions]
  },
  attentionDeletion(state, attentionId) {
    state.attentions = state.attentions.filter(a => a._id !== attentionId)
  }
}

/**
* @type {import('vuex').ActionTree<ReturnType<typeof state>>, any>}
*/
export const actions = {
  async getUserAttentions(ctx, userId) {
    const attentionsReq = await this.$axios.get('/attentions/byUser/' + userId)

    ctx.commit('attentions', attentionsReq.data.payload)
  },
  async createAttention(ctx, attentionData) {
    /*const attentionsReq = */await this.$axios.post('/attentions', attentionData)

    // ctx.commit('attention', attentionsReq.data.payload)
  },
  async updateAttention(ctx, attentionData) {
    await this.$axios.put('/attentions/' + attentionData._id, attentionData)
  },
  async removeAttention(ctx, attentionId) {
    await this.$axios.delete('/attentions/' + attentionId)
    ctx.commit('attentionDeletion', attentionId)
  },
  async retrieveRangeDate(ctx, range) {
    const attentionsReq = await this.$axios.get('/attentions/byRange', {
      params: range
    })
    ctx.commit('attentions', attentionsReq.data.payload)
  }
}

export const strict = false
