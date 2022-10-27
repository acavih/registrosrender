export const state = () => ({
  partners: [],
  totalItems: 0
})

export const getters = {
}

export const mutations = {
  setPartners: (state, { partners, totalItems }) => {
    state.partners = partners
    state.totalItems = totalItems
  }
}

export const actions = {
  async retrievePartners({ commit }, query) {
    const resources = await this.$axios.get('/partners', {
      params: query
    })
    commit('setPartners', resources.data.payload)
  }
}

export const strict = false
