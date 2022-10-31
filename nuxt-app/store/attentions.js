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
  }
}

export const strict = false
