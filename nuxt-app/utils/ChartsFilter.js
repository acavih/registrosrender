export const chartsFilters = ({ filters }) => ({
  memberResourceFilter: (key) => (a) => {
    if (!filters.partners[key] || filters.partners[key].length === 0) { return true }
    for (let index = 0; index < filters.partners[key].length; index++) {
      const resource = filters.partners[key][index]
      if (a.user[key] && a.user[key]._id === resource) {
        return true
      }
    }
    return false
  },

  attentionLugaratencionFilter(a) {
    // console.log(!filters.attentions.lugaratencion.length, filters.attentions.lugaratencion, a.lugaratencion)
    if (!filters.attentions.lugaratencion.length) { return true }
    if (a.lugaratencion === null) { return false }
    return filters.attentions.lugaratencion.filter(b => {
      console.log(b, a.lugaratencion)
      return a.lugaratencion._id === b
    }).length > 0
  },

  attentionResourceFilter: (key) => (a) => {
    const arrayResource = filters.attentions[key]
    if (!arrayResource || arrayResource.length === 0) { return true }

    const finalValue = []

    for (let index = 0; index < arrayResource.length; index++) {
      const element = arrayResource[index]
      finalValue.push(a[key].filter((r) => {
        return r._id === element
      }).length > 0)
    }

    return !finalValue.includes(false)
  }
})

export default chartsFilters
