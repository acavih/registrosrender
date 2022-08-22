import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IResource } from 'registros-types'

export const state = () => ({
  resourcesList: [] as IResource[],
  loaded: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  resourcesFiltered: state => (activeResource: string, txtQuery: string) => {
    return state.resourcesList
      .filter(r => r.type === activeResource)
      .filter(r => new RegExp(txtQuery, 'i').test(r.name))
  }
}

export const mutations: MutationTree<RootState> = {
  setAllResources (state, resources) {
    state.resourcesList = resources
    state.loaded = true
  },
  commitResourceUpdate (state, resource) {
    state.resourcesList = state.resourcesList.map((r) => {
      if (r._id === resource._id) { return resource }
      return r
    })
  },
  addResource (state, resource) {
    state.resourcesList.push(resource)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchResources (ctx) {
    const resources = await this.$axios.get('/resources')
    ctx.commit('setAllResources', resources.data.payload.resources)
  },
  async createResource (ctx, resourcePayload) {
    const payload = resourcePayload
    const { status, data: { message, payload: { resource } } } = await this.$axios.post('/resources', payload)
    if (status === 201) {
      ctx.commit('addResource', resource)
    }
    return { status, data: { message, payload: { resource } } }
  },
  async updateResource (ctx, { payload, resourceToEdit }) {
    const { status, data: { message, payload: { resource } } } = await this.$axios.put('/resources/' + resourceToEdit._id, payload)
    if (status < 400) {
      ctx.commit('commitResourceUpdate', resource)
    }
    return { message }
  }
}
