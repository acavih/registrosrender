import { uniq, orderBy } from 'lodash'

export const state = () => ({
  loading: false,
  resources: []
})

export const getters = {
  resourcesOrdered: (state) => orderBy(state.resources, 'name'),
  typesResources: (state) => uniq(state.resources.map(r => r.type)),
  resourceType: (state, getters) => (type) => getters.resourcesOrdered.filter(r => r.type === type),
  getResoruce: (state) => (id) => state.resources.filter(r => r._id === id)[0]
}

export const mutations = {
  toggleLoading: (state) => state.loading = !state.loading,
  setResources: (state, list) => state.resources = list,
  addResource: (state, resource) => state.resources = [...state.resources, resource],
  updateResource(state, resource) {
    state.resources = state.resources.map(r => {
      if (r._id === resource._id) return resource
      return r
    })
  }
}

export const actions = {
  async retrieveResources({ commit }) {
    commit('toggleLoading')
    const resources = await this.$axios.get('/resources')
    commit('setResources', resources.data.payload)
    commit('toggleLoading')
  },
  async updateResource({ commit }, resource) {
    console.dir(this)
    const resourceReq = await this.$axios.put('/resources/' + resource._id, resource)
    commit('updateResource', resourceReq.data.payload)
  },
  async createResource({ commit }, resource) {
    commit('toggleLoading')
    const { _id, ...payload } = resource
    const resourceReq = await this.$axios.post('/resources/', payload)
    commit('addResource', resourceReq.data.payload)
    commit('toggleLoading')
  }
}

export const strict = false
