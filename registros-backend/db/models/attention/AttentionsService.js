const Attention = require("./Attention")

module.exports = {
  async getUserAttentions(userId) {
    const attentions = await Attention.find({ user: userId })
      .populate([
        "tipoaenciones", "Proyectos", "motivosatencion", "derivadoa",
        "derivadode", "formacion", "voluntariado", "lugaratencion"
      ])
    return attentions
  },
  async getAttentionsInRangeDate(d1, d2) {
    const startDate = d1 || new Date('2022/01/01')
    const endDate = d2 || new Date('2022/01/31')
    const attentions = await Attention.find({
      fechaatencion: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate([
      "tipoaenciones", "Proyectos", "motivosatencion", "derivadoa",
      "derivadode", "formacion", "voluntariado", "lugaratencion", "user"
    ])
    return attentions
  }
}
