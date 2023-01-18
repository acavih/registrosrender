export const state = () => ({
  partnersList: [],
  currentPartner: undefined,
  totalItems: 0
})

/**
* @type {import('vuex').GetterTree<ReturnType<typeof state>>, any>}
*/
export const getters = {
  getPartnerById: (state) => (id) => {
    return state.partnersList.filter(p => p._id === id)[0]
  }
}

/**
* @type {import('vuex').MutationTree<ReturnType<typeof state>>>}
*/
export const mutations = {
  partnersList(state, {partners, totalItems}) {
    state.partnersList = partners
    state.totalItems = totalItems
  },
  partner(state, partner) {
    state.currentPartner = partner
  }
}

/**
* @type {import('vuex').ActionTree<ReturnType<typeof state>>, any>}
*/
export const actions = {
  async retrievePartners(ctx, query) {
    console.log('recuperando socios..')
    const list = await this.$axios.get('/partners', {params: query})
    ctx.commit('partnersList', list.data.payload)
  },
  async createPartner(ctx, partnerData) {
    await this.$axios.post('/partners', partnerData)
  },
  async fetchPartner(ctx, id) {
    const partnerReq = await this.$axios.get('/partners/' + id)
    ctx.commit('partner', partnerReq.data.payload)
  },
  async updatePartner(ctx, partnerInfo) {
    const result = await this.$axios.put('/partners/' + partnerInfo._id, partnerInfo)
    ctx.commit('partner', result.data.payload)
  },
  async removePartner(ctx, partnerId) {
    await this.$axios.delete('/partners/' + partnerId)
  }
}

export const strict = false
