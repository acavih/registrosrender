import _, { filter } from 'lodash'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IAttention, IResource } from 'registros-types'
import { chartsFilters } from '~/utils/chartsFilter'

export const state = () => ({
  attentionsDataset: [] as IAttention[],
  loaded: false,
  chartsFilters: {
    partners: {} as {[key: string]: IResource[]},
    attentions: {} as { [key: string]: IResource[] }
  }
})

export type RootState = ReturnType<typeof state>

const membersFilters = ['sexo', 'socioono', 'nacionalidad', 'ciudadresidencia']
const attentionsFilters = [
  'tipoaenciones',
  'derivadoa',
  'derivadode',
  'Proyectos',
  'motivosatencion',
  'formacion',
  'voluntariado'
]

export const getters: GetterTree<RootState, RootState> = {
  filteredAttentions (state) {
    const { memberResourceFilter, attentionLugaratencionFilter, attentionResourceFilter } = chartsFilters(state)

    let filteredAttentions = [...state.attentionsDataset]

    for (const i of membersFilters) { filteredAttentions = filteredAttentions.filter(memberResourceFilter(i)) }
    for (const i of attentionsFilters) { filteredAttentions = filteredAttentions.filter(attentionResourceFilter(i)) }

    return filteredAttentions

    /* return [...state.attentionsDataset]
      /* .filter(memberResourceFilter('sexo'))
      .filter(memberResourceFilter('socioono'))
      .filter(memberResourceFilter('nacionalidad'))
      .filter(memberResourceFilter('ciudadresidencia'))
      .filter(attentionResourceFilter('tipoaenciones'))
      .filter(attentionResourceFilter('derivadoa'))
      .filter(attentionResourceFilter('derivadode'))
      .filter(attentionResourceFilter('Proyectos'))
      .filter(attentionResourceFilter('motivosatencion'))
      .filter(attentionResourceFilter('formacion'))
      .filter(attentionResourceFilter('voluntariado'))
      .filter(attentionLugaratencionFilter) */
  },
  distinctUsers (_state, getters) {
    const users = [...getters.filteredAttentions].map((r: any) => r.user)
    return _.uniqBy(users, '_id')
  }
}

export const mutations: MutationTree<RootState> = {
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
