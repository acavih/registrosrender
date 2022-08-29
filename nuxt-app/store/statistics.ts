import _ from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { IAttention, IResource } from 'registros-types'

export const state = () => ({
  attentionsDataset: [] as IAttention[],
  loaded: false,
  chartsFilters: {
    partners: {} as {[key: string]: IResource},
    attentions: {} as { [key: string]: IResource }
  }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getField,
  filteredAttentions (state) {
    const memberResourceFilter = (key: any) => (a: IAttention) => {
      if (!state.chartsFilters.partners[key]) { return true }
      return (a as any).user[key].name === state.chartsFilters.partners[key].name
    }

    return [...state.attentionsDataset]
      .filter(memberResourceFilter('sexo'))
      .filter(memberResourceFilter('socioono'))
      .filter(memberResourceFilter('nacionalidad'))
      .filter(memberResourceFilter('ciudadresidencia'))
  },
  distinctUsers (_state, getters) {
    const users = [...getters.filteredAttentions].map((r: any) => r.user)
    return _.uniqBy(users, '_id')
  }
}

export const mutations: MutationTree<RootState> = {
  updateField,
  chartsFilters (state, filters) {
    state.chartsFilters = filters
  },
  setAttentions (state, list) {
    state.attentionsDataset = list
    state.loaded = true
  }
}

export const actions: ActionTree<RootState, RootState> = {
}
