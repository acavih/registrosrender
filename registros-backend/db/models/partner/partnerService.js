// const lookUpResourceAggregation = require("../../../utils/lookUpResourceAggregation")
const { getOrCreateResource } = require("../resources/resourceService")
const Partner = require("./Partner")

function lookupResourceAggregation(field, single) {
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
}

const partnerQueryFields = [
  '$codigo', ' ',
  '$nombre', ' ',
  '$apellidos', ' ',
  '$telefono', ' ',
  '$sipcard', ' ',
  '$correoelectronico'
]

const partnerService = {
  async listPartners({ page = 1, itemsPerPage = 20, searchQuery }) {
    const skip = (page - 1) * itemsPerPage
    /* const partners = await Partner.find({}).limit(itemsPerPage).skip(skip)
    const totalItems = await Partner.count()*/

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
    const partner = await Partner.findOne({ _id: id })
      .populate(['sexo', 'socioono', 'ciudadresidencia', 'nacionalidad'])
    return partner
  },
  async createPartner(partnerData) {
    const partner = await Partner.create({
      ...partnerData,
      sexo: partnerData.sexo || await getOrCreateResource('sexos', 'NS/NC'),
      socioono: partnerData.socioono || await getOrCreateResource('socioonos', 'NS/NC'),
      nacionalidad: partnerData.nacionalidad || await getOrCreateResource('residencias', 'NS/NC'),
      ciudadresidencia: partnerData.ciudadresidencia || await getOrCreateResource('nacionalidads', 'NS/NC')
    })
    console.log(partner)
    return partner
  }
}

module.exports = partnerService
