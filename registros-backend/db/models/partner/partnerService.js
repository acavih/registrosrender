const Partner = require("./Partner")

const partnerService = {
  async listPartners({ page = 1, itemsPerPage = 20 }) {
    const skip = (page - 1) * itemsPerPage
    const partners = await Partner.find({}).limit(itemsPerPage).skip(skip)
    const totalItems = await Partner.count()
    return { partners, totalItems }
  },
  async getPartner(id) {
    const partner = await Partner.findOne({ _id: id })
    return partner
  }
}

module.exports = partnerService
