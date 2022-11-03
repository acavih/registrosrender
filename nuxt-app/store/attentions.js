export const state = () => ({
  userAttentions: [],
  rangeDateAttentions: [],
})

export const getters = {
}

export const mutations = {
  setUserAttentions(state, attentions) {
    state.userAttentions = attentions
  },
  setRangeDateAttentions(state, attentions) {
    state.rangeDateAttentions = attentions
  },
  addAttention(state, attention) {
    state.userAttentions = [attention, ...state.userAttentions]
  }
}

/**
* @type {import('vuex').ActionTree<any, any>}
*/
export const actions = {
  async getUserAttentions({ commit }, userId) {
    const attentions = await this.$axios.get('/attentions/byUser/' + userId)
    commit('setUserAttentions', attentions.data.payload)
  },
  async getRangeDateAttentions({ commit }, query) {
    const attentions = await this.$axios.get('/attentions/byRange', {
      params: query
    })
    commit('setRangeDateAttentions', attentions.data.payload)
  },
  async addAttention({ commit }, attentionPayload) {
    const attention = await this.$axios.post('/attentions', attentionPayload)
    commit('addAttention', attention.data.payload)
  },
  async updateAttention(_, { payload, id }) {
    await this.$axios.put('/attentions/' + id, {
      ...payload
    })
  }
}

export const strict = false
