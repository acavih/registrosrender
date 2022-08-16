import { PipelineStage } from 'mongoose'

export default function lookupResourceAggregation (field: string, single: boolean) {
  const aggregation: PipelineStage[] = [
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
