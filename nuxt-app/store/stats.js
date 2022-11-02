import _ from 'lodash'
import chartsFilters from '../utils/ChartsFilter'

export const state = () => ({
  drawerActive: true,
  loading: false,
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
    const { memberResourceFilter, attentionLugaratencionFilter, attentionResourceFilter } = chartsFilters({ filters: state.filters })

    let filteredAttentions = [...rootState.attentions.rangeDateAttentions]

    const membersFilters = Object.keys(state.filters.partners)
    const attentionsFilters = Object.keys(state.filters.attentions)

    console.log(membersFilters, attentionsFilters, state.filters)

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
  },
  toggleLoading(state) {
    state.loading = !state.loading
  }
}

/**
* @type {import('vuex').ActionTree<any, any>}
*/
export const actions = {
}

export const strict = false
