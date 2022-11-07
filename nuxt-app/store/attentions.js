export const state = () => ({
  userAttentions: [],
  rangeDateAttentions: [],
  lastAttentions: [],
  totalAttentions: 0
})

/**
* @type {import('vuex').GetterTree<ReturnType<typeof state>, any>}
*/
export const getters = {
}

/**
* @type {import('vuex').MutationTree<ReturnType<typeof state>>}
*/
export const mutations = {
  setUserAttentions(state, attentions) {
    state.userAttentions = attentions
  },
  setRangeDateAttentions(state, attentions) {
    state.rangeDateAttentions = attentions
  },
  addAttention(state, attention) {
    state.userAttentions = [attention, ...state.userAttentions]
  },
  setLastAttentions(state, { attentions, totalAttentions }) {
    state.lastAttentions = attentions
    state.totalAttentions = totalAttentions
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
  },
  async retrieveLastAttentions({ commit }, query = {}) {
    const attentions = await this.$axios.get('/attentions/last', {
      params: query
    })
    commit('setLastAttentions', attentions.data.payload)
  }
}

export const strict = false
