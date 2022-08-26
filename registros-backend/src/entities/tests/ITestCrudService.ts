import { ITest } from "registros-types";

export default interface ITestCrudService {
  addTest(test: ITest): Promise<ITest>
  modifyTest(testId: string, testUpdate: ITest): Promise<any>
  removeTest(testId: string): Promise<any>
  testsByAttention(attentionId: string): Promise<ITest[]>
}
