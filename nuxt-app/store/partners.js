export const state = () => ({
  partnersList: []
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
}

/**
* @type {import('vuex').ActionTree<ReturnType<typeof state>>, any>}
*/
export const actions = {
  async retrievePartners() {
    const list = await this.$axios.get('/partners')
    console.dir(list)
  }
}

export const strict = false
