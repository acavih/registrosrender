import _ from 'lodash'
import chartsFilters from '../utils/ChartsFilter'

/*const membersFilters = ['sexo', 'socioono', 'nacionalidad', 'ciudadresidencia']
const attentionsFilters = [
  'tipoaenciones',
  'derivadoa',
  'derivadode',
  'Proyectos',
  'motivosatencion',
  'formacion',
  'voluntariado'
]*/

export const state = () => ({
  drawerActive: true,
  filters: {
    partners: {
      sexo: [],
      socioono: [],
      nacionalidad: [],
      ciudadresidencia: [],
    },
    attentions: {
      tipoaenciones: [],
      derivadoa: [],
      derivadode: [],
      Proyectos: [],
      motivosatencion: [],
      formacion: [],
      voluntariado: [],
    },
  }
})

export const getters = {
  filteredAttentions: (state, getters, rootState) => {
    console.log('filters', state.filters)
    const { memberResourceFilter, attentionLugaratencionFilter, attentionResourceFilter } = chartsFilters({ filters: state.filters })

    let filteredAttentions = [...rootState.attentions.rangeDateAttentions]

    const membersFilters = Object.keys(state.filters.partners)
    const attentionsFilters = Object.keys(state.filters.attentions)

    membersFilters.forEach((k) => {
      filteredAttentions = [...filteredAttentions.filter(memberResourceFilter(k))]
    })
    attentionsFilters.forEach((k) => {
      filteredAttentions = [...filteredAttentions.filter(attentionResourceFilter(k))]
    })
    // filteredAttentions = [...filteredAttentions.filter(attentionLugaratencionFilter)]

    return filteredAttentions
  },
  distinctUsers(_state, getters, rootState) {
    console.log('usuarios')
    const users = [...getters.filteredAttentions].map((r) => r.user)
    return _.uniqBy(users, '_id')
  }
}

export const mutations = {
  updateFilters(state, filters) {
    state.filters = { ...filters }
  },
  toggleDrawer(state) {
    state.drawerActive = !state.drawerActive
  }
}

/**
* @type {import('vuex').ActionTree<any, any>}
*/
export const actions = {
}

export const strict = false
