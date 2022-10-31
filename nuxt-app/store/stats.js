import _ from 'lodash'
import chartsFilters from '../utils/ChartsFilter'

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

export const state = () => ({
  filters: {
    partners: {},
    attentions: {},
  }
})

export const getters = {
  filteredAttentions: (state, getters, rootState) => {
    const { memberResourceFilter, attentionLugaratencionFilter, attentionResourceFilter } = chartsFilters({ filters: state.filters })

    let filteredAttentions = [...rootState.attentions.rangeDateAttentions]

    for (const i of membersFilters) { filteredAttentions = filteredAttentions.filter(memberResourceFilter(i)) }
    for (const i of attentionsFilters) { filteredAttentions = filteredAttentions.filter(attentionResourceFilter(i)) }
    filteredAttentions = filteredAttentions.filter(attentionLugaratencionFilter)

    return filteredAttentions
  },
  distinctUsers(_state, getters, rootState) {
    const users = [...rootState.attentions.rangeDateAttentions].map((r) => r.user)
    return _.uniqBy(users, '_id')
  }
}

export const mutations = {
  updateFilters(state, filters) {
    state.filters = filters
  }
}

/**
* @type {import('vuex').ActionTree<any, any>}
*/
export const actions = {
}

export const strict = false
