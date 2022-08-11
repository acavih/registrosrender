import { SignOptions } from 'jsonwebtoken'

export const PORT = Number(process.env.PORT || 8080)
export const URI_DB_MONGO = process.env.URI_DB_MONGO || 'mongodb://localhost/acavih'
export const JWT_SECRET_KEY = process.env.SECRET_KEY || 'csdmscdiweiewio'
export const JWT_SUBJECT = process.env.JWT_SUBJECT || 'acavih'

export const jwtSignOptionsOf:
  (issuer: string) => SignOptions = (issuer: string) =>
    ({
      expiresIn: '6h',
      issuer,
      subject: JWT_SUBJECT
    })
