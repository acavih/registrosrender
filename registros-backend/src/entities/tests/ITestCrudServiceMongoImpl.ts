import { ITest } from "registros-types";
import ITestCrudService from "./ITestCrudService";
import Test from "./Test";

export default class ITestCrudServiceMongoImpl implements ITestCrudService {
  async addTest(test: ITest): Promise<ITest> {
    const createdTest = await Test.create(test)
    return createdTest as ITest
  }
  async modifyTest(testId: string, testUpdate: ITest): Promise<any> {
    await Test.findOneAndUpdate({ _id: testId }, { $set: testUpdate })
  }
  async removeTest(testId: string): Promise<any> {
    await Test.findOneAndRemove({ _id: testId })
  }
  async testsByAttention(attentionId: string): Promise<ITest[]> {
    const tests = await Test.find({ attention: attentionId })
    return tests as ITest[]
  }

}
