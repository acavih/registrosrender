// const lookUpResourceAggregation = require("../../../utils/lookUpResourceAggregation")
const Attention = require("../attention/Attention")
const { getOrCreateResource } = require("../resources/resourceService")
const Partner = require("./Partner")

const fieldsToPopulate = ['sexo', 'socioono', 'ciudadresidencia', 'nacionalidad', 'howDidKnowUs']

const partnerQueryFields = [
  '$codigo', ' ',
  '$nombre', ' ',
  '$apellidos', ' ',
  '$telefono', ' ',
  '$sipcard', ' ',
  '$correoelectronico'
]

const partnerService = {
  partnerFieldsToPopulate: fieldsToPopulate,
  async listPartners({ page = 1, itemsPerPage = 20, searchQuery }) {
    const skip = (page - 1) * itemsPerPage

    let pattern = (searchQuery || '').replace(/\s/g, '.*')
    const specialCharacters = ['+', '/', '(', '[', ']', ')', '^', '{', '}', '$']
    specialCharacters.forEach(char => {
      pattern = pattern.replace(new RegExp('\\' + char, 'g'), '\\' + char);
    })

    const joinKeys = [
      ['sexo', true],
      ['socioono', true],
      ['ciudadresidencia', true],
      ['nacionalidad', true]
    ]

    const [
      sexoag,
      socioonoag,
      ciudadrag,
      nacionalidadag,
    ] = joinKeys.map(([field, single]) => {
      const aggregation = [
        {
          $lookup: {
            from: 'resources', // <collection to join>,
            localField: field, // <field from the input documents >,
            foreignField: '_id', // <field from the documents of the "from" collection >,
            as: field // <output array field >
          }
        }
      ]
      if (single) {
        aggregation.push({
          $unwind: { path: '$' + field }
        })
      }

      return aggregation
    })

    const aggregatesPipeline = [
      ...sexoag,
      ...socioonoag,
      ...ciudadrag,
      ...nacionalidadag,
      {
        $addFields: {
          qUser: {
            $concat: partnerQueryFields
          }
        }
      }
    ]

    aggregatesPipeline.push({
      $match: {
        qUser: { $regex: new RegExp(pattern, 'i') }
      }
    })

    aggregatesPipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: Number(itemsPerPage) }]
      }
    })

    const [aggregatePartners] = await Partner.aggregate(aggregatesPipeline)

    const totalDocs = aggregatePartners.metadata[0] && aggregatePartners.metadata[0].total || 0

    const partnersList = aggregatePartners.data

    return { partners: partnersList, totalItems: totalDocs }
  },
  async getPartner(id) {
    console.log('recuperando id ' + id)
    const partner = await Partner.findOne({ _id: id })
      .populate(fieldsToPopulate)
    console.dir(JSON.parse(JSON.stringify(partner)))
    return JSON.parse(JSON.stringify(partner))
  },
  async createPartner(partnerData) {
    const partner = await Partner.create({
      ...partnerData,
      sexo: partnerData.sexo || await getOrCreateResource('sexos', 'NS/NC'),
      socioono: partnerData.socioono || await getOrCreateResource('socioonos', 'NS/NC'),
      nacionalidad: partnerData.nacionalidad || await getOrCreateResource('residencias', 'NS/NC'),
      ciudadresidencia: partnerData.ciudadresidencia || await getOrCreateResource('nacionalidads', 'NS/NC'),
      howDidKnowUs: partnerData.howDidKnowUs || await getOrCreateResource('nacionalidads', 'NS/NC'),
    })
    console.log(partner)
    return partner
  },
  async updatePartner(partnerId, update) {
    await Partner.findOneAndUpdate({ _id: partnerId }, {
      $set: {
        ...update,
        sexo: update.sexo || await getOrCreateResource('sexos', 'NS/NC'),
        socioono: update.socioono || await getOrCreateResource('socioonos', 'NS/NC'),
        nacionalidad: update.nacionalidad || await getOrCreateResource('residencias', 'NS/NC'),
        ciudadresidencia: update.ciudadresidencia || await getOrCreateResource('nacionalidads', 'NS/NC'),
        howDidKnowUs: update.howDidKnowUs || await getOrCreateResource('comoNosConoció', 'NS/NC'),
      }
    })
  },
  async deletePartner(partnerId) {
    const removed = await Attention.deleteMany({
      user: partnerId
    })
    console.dir(removed)
    await Partner.findOneAndRemove({_id: partnerId})
  }
}

module.exports = partnerService
