import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  partners: []
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  setPartners (state, list) {
    state.partners = list
  }
}

export const actions: ActionTree<RootState, RootState> = {
}
