import { IAttention, IResource } from '~/../registros-types'

export const chartsFilters = (state: any) => ({
  memberResourceFilter: (key: any) => (a: IAttention) => {
    if (!state.chartsFilters.partners[key] || state.chartsFilters.partners[key].length === 0) { return true }
    for (let index = 0; index < state.chartsFilters.partners[key].length; index++) {
      const resource = state.chartsFilters.partners[key][index]
      if ((a as any).user[key].name === resource.name) {
        return true
      }
    }
    return false
  },

  attentionLugaratencionFilter (a: IAttention) {
    if (!state.chartsFilters.attentions.lugaratencion) { return true }
    if (a.lugaratencion === null) { return false }
    return a.lugaratencion!.name === (state.chartsFilters.attentions.lugaratencion as any).name
  },

  attentionResourceFilter: (key: any) => (a: IAttention) => {
    const arrayResource = state.chartsFilters.attentions[key]
    if (!arrayResource || arrayResource.length === 0) { return true }

    const finalValue: boolean[] = []

    for (let index = 0; index < arrayResource.length; index++) {
      const element = arrayResource[index]
      finalValue.push((a as any)[key].filter((r: IResource) => r.name === element.name).length > 0)
    }

    return !finalValue.includes(false)
  }
})
