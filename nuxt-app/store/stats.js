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
  filters: {},
  chartsToDraw: {
    partners: [
      {
        attribute: 'sexo',
        typeChart: 'pie',
        chartOptionsAttrs: {seriesName: 'Socios', titleText: 'Socios agrupados por sexo'}
      },
      {
        attribute: 'socioono',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Socios', titleText: 'Socios agrupados por socio o no'}
      },
      {
        attribute: 'nacionalidad',
        typeChart: 'barChart',
        chartOptionsAttrs: {seriesName: 'Socios', titleText: 'Socios agrupados por nacionalidad'}
      },
      {
        attribute: 'ciudadresidencia',
        typeChart: 'barChart',
        chartOptionsAttrs: {seriesName: 'Socios', titleText: 'Socios agrupados por residencia'}
      },
      {
        attribute: 'howDidKnowUs',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Socios', titleText: 'Socios agrupados por como nos conoció'}
      }
    ]
  }
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
