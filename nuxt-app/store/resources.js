import _ from 'lodash'

export const state = () => ({
  resourceList: []
})

/**
* @type {import('vuex').GetterTree<ReturnType<typeof state>>, any>}
*/
export const getters = {
  resourceTypes(state) {
    return _.uniq(state.resourceList.map(r => r.type))
  },
  resourcesOfType: (state) => (type) => {
    return _.sortBy(state.resourceList.filter(r => r.type === type), ['name'])
  }
}

/**
* @type {import('vuex').MutationTree<ReturnType<typeof state>>>}
*/
export const mutations = {
  resourceList (state, list) {
    state.resourceList = list
  }
}

/**
* @type {import('vuex').ActionTree<ReturnType<typeof state>>, any>}
*/
export const actions = {
  async retrieveResources(ctx) {
    const items = await this.$axios.get('/resources')
    ctx.commit('resourceList', items.data.payload)
  }
}

export const strict = false
