export const state = () => ({
  partnersList: [],
  totalItems: 0
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
  partnersList(state, {partners, totalItems}) {
    state.partnersList = partners
    state.totalItems = totalItems
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
  }
}

export const strict = false
