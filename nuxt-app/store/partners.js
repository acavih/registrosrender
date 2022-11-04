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
  },
  addPartner: (state, partner) => {
    state.partners.push(partner)
  },
  replacePartner: (state, partner) => {
    state.partners = [...state.partners.map(p => {
      if (p._id === partner._id) return partner
      return p
    })]
  }
}

export const actions = {
  async retrievePartners({ commit }, query) {
    const resources = await this.$axios.get('/partners', {
      params: query
    })
    commit('setPartners', resources.data.payload)
  },
  async retrievePartner({ commit }, id) {
    const resources = await this.$axios.get('/partners/' + id)
    commit('addPartner', resources.data.payload)
  },
  async addPartner(_ctx, partnerData) {
    await this.$axios.post('/partners', partnerData)
  },
  async updatePartner({ commit }, partnerData) {
    await this.$axios.put('/partners/' + partnerData._id, partnerData)
    commit('replacePartner', partnerData)
  }
}

export const strict = false
