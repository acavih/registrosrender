import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import httpStatus from "http-status";
import { ParsedQs } from "qs";
import { ITest } from "registros-types";
import { FeedbackMessage } from "../../types";
import AbstractPartnerCrudRouter from "../partners/AbstractPartnerCrudRouter";
import AbstractTestCrudRouter from "./AbstractTestCrudRouter";
import Test from "./Test";

export default class AbstractTestsCrudRouterImpl extends AbstractTestCrudRouter {
  async listTestByAttention(req: Request, res: Response) {
    const tests = await this.service.testsByAttention(req.params.attentionId)
    res.json({
      message: 'Listado de tests',
      payload: tests,
      result: true,
      statusCode: httpStatus.OK
    } as FeedbackMessage<ITest[]>)
  }
  async createTest(req: Request, res: Response) {
    const tests = await this.service.addTest(req.body)
    res.status(httpStatus.CREATED).json({
      message: 'Test creado',
      payload: tests,
      result: true,
      statusCode: httpStatus.CREATED
    } as FeedbackMessage<ITest>)
  }
  async modifyTest(req: Request, res: Response) {
    const tests = await this.service.modifyTest(req.params.id, req.body)
    res.json({
      message: 'Test actualizado',
      payload: tests,
      result: true,
      statusCode: httpStatus.OK
    } as FeedbackMessage<ITest[]>)
  }
  async removeTest(req: Request, res: Response) {
    const tests = await this.service.removeTest(req.params.id)
    res.json({
      message: 'Test eliminado',
      payload: tests,
      result: true,
      statusCode: httpStatus.OK
    } as FeedbackMessage<ITest[]>)
  }
}
