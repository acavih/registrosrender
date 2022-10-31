export const chartsFilters = ({ chartsFilters }) => ({
  memberResourceFilter: (key) => (a) => {
    if (!chartsFilters.partners[key] || chartsFilters.partners[key].length === 0) { return true }
    for (let index = 0; index < chartsFilters.partners[key].length; index++) {
      const resource = chartsFilters.partners[key][index]
      if (a.user[key].name === resource.name) {
        return true
      }
    }
    return false
  },

  attentionLugaratencionFilter(a) {
    if (!chartsFilters.attentions.lugaratencion) { return true }
    if (a.lugaratencion === null) { return false }
    return a.lugaratencion.name === (chartsFilters.attentions.lugaratencion).name
  },

  attentionResourceFilter: (key) => (a) => {
    const arrayResource = chartsFilters.attentions[key]
    if (!arrayResource || arrayResource.length === 0) { return true }

    const finalValue = []

    for (let index = 0; index < arrayResource.length; index++) {
      const element = arrayResource[index]
      finalValue.push(a[key].filter((r) => r.name === element.name).length > 0)
    }

    return !finalValue.includes(false)
  }
})

export default chartsFilters
