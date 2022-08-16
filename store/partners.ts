import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  partners: [],
  totalDocs: 0
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  setPartners (state, { list, totalDocs }) {
    state.partners = list
    state.totalDocs = totalDocs
  }
}

export const actions: ActionTree<RootState, RootState> = {
}
