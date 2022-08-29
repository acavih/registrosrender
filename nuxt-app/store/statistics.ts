import _ from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { IAttention, IResource } from 'registros-types'

export const state = () => ({
  attentionsDataset: [] as IAttention[],
  loaded: false,
  chartsFilters: {
    partners: {} as {[key: string]: IResource[]},
    attentions: {} as { [key: string]: IResource[] }
  }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getField,
  filteredAttentions (state) {
    const memberResourceFilter = (key: any) => (a: IAttention) => {
      if (!state.chartsFilters.partners[key] || state.chartsFilters.partners[key].length === 0) { return true }
      for (let index = 0; index < state.chartsFilters.partners[key].length; index++) {
        const resource = state.chartsFilters.partners[key][index]
        if ((a as any).user[key].name === resource.name) {
          return true
        }
      }
      return false
    }

    const attentionResourceFilter = (key: any) => (a: IAttention) => {
      const arrayResource = state.chartsFilters.attentions[key]
      if (!arrayResource || arrayResource.length === 0) { return true }

      const finalValue: boolean[] = []

      for (let index = 0; index < arrayResource.length; index++) {
        const element = arrayResource[index]
        finalValue.push((a as any)[key].filter((r: IResource) => r.name === element.name).length > 0)
      }

      console.log('filtrando por ', key, arrayResource, finalValue)

      return !finalValue.includes(false)
    }

    return [...state.attentionsDataset]
      .filter(memberResourceFilter('sexo'))
      .filter(memberResourceFilter('socioono'))
      .filter(memberResourceFilter('nacionalidad'))
      .filter(memberResourceFilter('ciudadresidencia'))
      .filter(attentionResourceFilter('tipoaenciones'))
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
