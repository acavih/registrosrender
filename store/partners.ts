import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  partners: [] as any[],
  totalDocs: 0
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

export const mutations: MutationTree<RootState> = {
  setPartners (state, data) {
    console.log(data)
    const { list, totalDocs } = data
    state.partners = list
    state.totalDocs = totalDocs
  },
  replacePartner (state, { idPartner, update }) {
    state.partners = (state.partners as any[]).map((p) => {
      if (p._id === idPartner) {
        console.log('remplazando')
        return update
      }
      return p
    })
  }
}

export const actions: ActionTree<RootState, RootState> = {
}
