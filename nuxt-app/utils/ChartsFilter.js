export const chartsFilters = ({ filters }) => ({
  memberResourceFilter: (key) => (a) => {
    if (!filters.partners[key] || filters.partners[key].length === 0) { return true }
    for (let index = 0; index < filters.partners[key].length; index++) {
      const resource = filters.partners[key][index]
      if (a.user[key] === resource) {
        return true
      }
    }
    console.log('member no pasa')
    return false
  },

  attentionLugaratencionFilter(a) {
    if (!filters.attentions.lugaratencion) { return true }
    if (a.lugaratencion === null) { return false }
    return a.lugaratencion.name === (filters.attentions.lugaratencion).name
  },

  attentionResourceFilter: (key) => (a) => {
    const arrayResource = filters.attentions[key]
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
