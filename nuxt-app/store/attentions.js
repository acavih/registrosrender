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
  async createAttention(ctx, attentionData) {}
}

export const strict = false
