import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose'
import jsonwebtoken from 'jsonwebtoken'

const logDBSchema = new mongoose.Schema({
  ip: { type: String },
  path: { type: String },
  method: {type: String},
  json: { type: String },
  moment: { type: Date, default: Date.now },
  tokenDecoded: { type: String }
})

const LogDBSchema = mongoose.model('logs', logDBSchema)

export default async function logInDB(req: Request, _res: Response, next: NextFunction) {
  const data = {
    ip: req.ip,
    path: req.path,
    method: req.method,
    json: req.path.includes('signin') ? null : JSON.stringify(req.body || {}),
    tokenDecoded: req.headers.authorization ? jsonwebtoken.decode(req.headers.authorization) : null
  }
  console.log(data)
  await LogDBSchema.create(data)
  next()
}
