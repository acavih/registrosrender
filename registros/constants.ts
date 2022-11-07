import path from 'path'

export const dbDir = path.resolve(__dirname, '../dump')
export const dbs = [
  { alias: 'remote', uri: process.env.URI_DB_MONGO_REMOTE },
  { alias: 'local', uri: process.env.URI_DB_MONGO }
]
