const Attention = require("./Attention")

module.exports = {
  async getUserAttentions(userId) {
    const attentions = await Attention.find({ user: userId })
      .populate([
        "tipoaenciones",
        "Proyectos",
        "motivosatencion",
        "derivadoa",
        "derivadode",
        "formacion",
        "voluntariado",
        "lugaratencion"
      ])
    return attentions
  }
}
