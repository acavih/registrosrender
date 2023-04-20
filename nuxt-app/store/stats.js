import chartsFilters from "@/utils/charts/chartsFilter";
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
  filters: {
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
      }
  },
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
      },
      {
        attribute: 'yearDidKnowus',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Socios', titleText: 'Socios agrupados por año en que nos conocio'}
      }
    ],
    attentions: [
      {
        attribute: 'derivadoa',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Derivado a', titleText: 'Socios agrupados por derivado a'}
      },
      {
        attribute: 'derivadode',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Derivado de', titleText: 'Socios agrupados por derivado de'}
      },
      {
        attribute: 'Proyectos',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Proyectos', titleText: 'Socios agrupados por proyectos'}
      },
      {
        attribute: 'tipoaenciones',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Tipos de atenciones', titleText: 'Socios agrupados por tipos de atenciones'}
      },
      {
        attribute: 'motivosatencion',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Motivos de atencion', titleText: 'Socios agrupados por motivos de atencion'}
      },
      {
        attribute: 'formacion',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Formación', titleText: 'Socios agrupados por formación'}
      },
      {
        attribute: 'voluntariado',
        typeChart: 'columnBar',
        chartOptionsAttrs: {seriesName: 'Voluntariado', titleText: 'Socios agrupados por voluntariado'}
      },
      {
        attribute: 'lugaratencion',
        typeChart: 'columnBar',
        multiple: false,
        chartOptionsAttrs: {seriesName: 'Lugar de atención', titleText: 'Socios agrupados por lugar de atención'}
      }
    ]
  },
})

/**
* @type {import('vuex').GetterTree<ReturnType<typeof state>>, any>}
*/
export const getters = {
  attentionsFiltered(state, getters, rootState) {
    const { memberResourceFilter, attentionLugaratencionFilter, attentionResourceFilter } = chartsFilters({ filters: state.filters })

    let filteredAttentions = [...rootState.attentions.attentions]

    const membersFilters = Object.keys(state.filters.partners)
    const attentionsFilters = Object.keys(state.filters.attentions)

    membersFilters.forEach((k) => {
      filteredAttentions = [...filteredAttentions.filter(memberResourceFilter(k))]
    })
    attentionsFilters.forEach((k) => {
      if (k !== 'lugaratencion') {
        filteredAttentions = [...filteredAttentions.filter(attentionResourceFilter(k))]
      }
    })

    filteredAttentions = [...filteredAttentions.filter(attentionLugaratencionFilter)]

    return filteredAttentions
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
