import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const dbDir = path.resolve(__dirname, '../dump')
export const dbs = [
  { alias: 'remote', uri: process.env.URI_DB_MONGO_REMOTE },
  { alias: 'local', uri: process.env.URI_DB_MONGO }
]
