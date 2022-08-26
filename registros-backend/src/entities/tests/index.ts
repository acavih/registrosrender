import AbstractTestsCrudRouterImpl from "./AbstractTestCrudRouterImpl";
import ITestCrudServiceMongoImpl from "./ITestCrudServiceMongoImpl";

export const testCrudServiceInstanceMongoImplInstance = new ITestCrudServiceMongoImpl()
export const testCrudRouterImplInstance = new AbstractTestsCrudRouterImpl(testCrudServiceInstanceMongoImplInstance)
