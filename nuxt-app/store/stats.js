import { uniqBy } from "lodash";

/**
 * filters: {
    partners: {
      sexo: [],
      socioono: [],
      nacionalidad: [],
      ciudadresidencia: [],
      howDidKnowUs: [],
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
  },
 */

export const state = () => ({
  filters: {}
})

/**
* @type {import('vuex').GetterTree<ReturnType<typeof state>>, any>}
*/
export const getters = {
  attentionsFiltered(state, getters, rootState) {
    return rootState.attentions.attentions
  },
  uniqUsers(state, getters) {
    const users = [...getters.attentionsFiltered].map(a => a.user)
    return uniqBy(users, (u) => {
      return u._id
    })
  }
}

/**
* @type {import('vuex').MutationTree<ReturnType<typeof state>>>}
*/
export const mutations = {
  filters(state, filters) {
    state.filters = filters
  }
}

/**
* @type {import('vuex').ActionTree<ReturnType<typeof state>>, any>}
*/
export const actions = {
}

export const strict = false
