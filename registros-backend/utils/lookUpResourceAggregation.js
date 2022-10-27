module.exports = function lookupResourceAggregation(field, single) {
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
