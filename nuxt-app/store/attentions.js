export const state = () => ({
  userAttentions: []
})

export const getters = {
}

export const mutations = {
  setUserAttentions(state, attentions) {
    state.userAttentions = attentions
  }
}

/**
* @type {import('vuex').ActionTree<any, any>}
*/
export const actions = {
  async getUserAttentions({ commit }, userId) {
    const attentions = await this.$axios.get('/attentions/byUser/' + userId)
    commit('setUserAttentions', attentions.data.payload)
  }
}

export const strict = false
