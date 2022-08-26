import mongoose from 'mongoose'
import { ITest } from "registros-types";
import Attention from '../attentions/Attention';

const testsSchema = new mongoose.Schema<ITest>({
  enfermedad: { type: mongoose.Types.ObjectId, ref: 'resources', required: true },
  dateTest: { type: Date, default: Date.now },
  result: { type: Boolean, default: false },
  attention: { type: mongoose.Types.ObjectId, ref: 'attentions', required: true }
})

testsSchema.post('save', async function () {
  const testId = this._id
  const attention = await Attention.findOne({ _id: this.attention })
  attention!.tests = (attention?.tests?.length ? [...attention.tests, testId] : [testId]) as any[]
  await attention?.save()
  console.log('Salvado test en atencion')
})

export const Test = mongoose.model('tests', testsSchema)

export default Test
