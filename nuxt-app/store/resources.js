import {uniq, orderBy} from 'lodash'

export const state = () => ({
  resources: []
})

export const getters = {
  resourcesOrdered: (state) => orderBy(state.resources, 'name'),
  typesResources: (state) => uniq(state.resources.map(r => r.type)),
  resourceType: (state, getters) => (type) => getters.resourcesOrdered.filter(r => r.type === type),
  getResoruce: (state) => (id) => state.resources.filter(r => r._id === id)
}

export const mutations = {
  setResources: (state, list) => state.resources = list,
  addResource: (state, resource) => state.resources = [...state.resources, resource],
  updateResource(state, resource) {
    const resourceToUpdate = state.resources.filter(r => r._id === resource._id)
    resource.name = resourceToUpdate.name
    resource.archived = resourceToUpdate.archived
  }
}

export const actions = {
  async retrieveResources({commit}) {
    const resources = await this.$axios.get('/resources')
    commit('setResources', resources.data.payload)
  },
  async updateResource({ commit }, resource) {
    console.dir(this)
    const resourceReq = await this.$axios.put('/resources/' + resources._id, resource)
    commit('updateResource', resourceReq.data.payload)
  },
  async createResource({ commit }, resource) {
    console.dir(this)
    const resourceReq = await this.$axios.post('/resources/', resource)
    commit('addResource', resourceReq.data.payload)
  }
}

export const strict = false
