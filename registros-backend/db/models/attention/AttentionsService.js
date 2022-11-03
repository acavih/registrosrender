const { partnerFieldsToPopulate } = require("../partner/partnerService")
const Attention = require("./Attention")

const fieldsToPopulate = [
  "tipoaenciones", "Proyectos", "motivosatencion", "derivadoa",
  "derivadode", "formacion", "voluntariado", "lugaratencion"
]

module.exports = {
  attentionsFieldsToPopulate: fieldsToPopulate,
  async getUserAttentions(userId) {
    const attentions = await Attention.find({ user: userId })
      .populate(fieldsToPopulate).sort('-fechaatencion')
    return attentions
  },
  async getAttentionsInRangeDate({ sd, ed }) {
    const startDate = formatDate(sd)
    const endDate = formatDate(ed)
    const attentions = await Attention.find({
      fechaatencion: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate(fieldsToPopulate).populate({
      path: 'user',
      populate: partnerFieldsToPopulate
    })
    return attentions
  }
}

function formatDate(date) {
  const [month, day, year] = date.split('-')
  return `${year}/${month}/${day}`
}
