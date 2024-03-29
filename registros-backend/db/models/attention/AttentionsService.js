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
  async removeAttention(attentionId) {
    await Attention.findOneAndRemove({_id: attentionId})
  },
  async lastAttentions({page = 1, itemsPerPage = 20}) {
    const query = {}
    const skip = (page - 1) * itemsPerPage

    const attentions = await Attention.find(query).limit(itemsPerPage).skip(skip).sort('-fechaatencion')
      .populate(fieldsToPopulate).sort('-fechaatencion')
      .populate({ path: 'user' })

    const totalAttentions = await Attention.find(query).countDocuments()

    return {attentions, totalAttentions}
  },
  async pendentAttentions({ page, pendentAttentions }) {
    const limit = 100
    const skip = (page - 1) * limit
    const query = pendentAttentions === "false" ? {} : {
      fechacosaspendientes: { $gte: new Date() }
    }
    console.log(query, pendentAttentions, new Boolean(pendentAttentions))
    const attentions = await Attention.find(query)
      .limit(limit).skip(skip)
      .populate(fieldsToPopulate).sort('-fechaatencion')
      .populate({ path: 'user' })
    const totalAttentions = await Attention.find(query).countDocuments()
    return { attentions, totalAttentions }
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
  },
  async createAttention(payload) {
    const attention = await Attention.create(payload)
    return attention
  },
  async updateAttention(id, payload) {
    const attention = await Attention.findOneAndUpdate({
      _id: id
    }, { $set: payload }, { returnOriginal: false })
    return attention
  }
}

function formatDate(date) {
  const [year, month, day] = date.split('-')
  return `${year}/${month}/${day}`
}
