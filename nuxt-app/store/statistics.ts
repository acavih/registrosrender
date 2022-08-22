import _ from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IAttention } from 'registros-types'

export const state = () => ({
  attentionsDataset: [] as IAttention[],
  loaded: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  distinctUsers (state) {
    const users = state.attentionsDataset.map((r: any) => r.user)
    console.log(users)
    return _.uniqBy(users, '_id')
  }
}

export const mutations: MutationTree<RootState> = {
  setAttentions (state, list) {
    state.attentionsDataset = list
    state.loaded = true
  }
}

export const actions: ActionTree<RootState, RootState> = {
}
