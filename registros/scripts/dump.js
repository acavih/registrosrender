import inquirer from 'inquirer'
import path from 'path'
import { dbDir, dbs } from "../constants.js";
import spawnCommand from '../helpers/spawnCommand.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default async function dump() {
  const { uriDb } = await inquirer.prompt([
    {
      type: 'list',
      name: 'uriDb',
      message: 'Seleccione la base de datos de la cual quiere hacer la copia de seguridad:',
      choices: dbs.map(db => ({
        value: db.uri,
        name: `(${db.alias}) -> ${db.uri}`
      }))
    }
  ])

  const d = new Date()

  const dateDir = [
    d.getFullYear(),
    d.getMonth().toString().padStart(2, '0'),
    d.getDate().toString().padStart(2, '0'),
    d.getHours().toString().padStart(2, '0'),
    d.getMinutes().toString().padStart(2, '0')
  ].join('_')

  const dumpDir = path.resolve(dbDir, dateDir)

  const host = new URL(uriDb)

  console.log('Haciendo copia de seguridad en ' + dumpDir + ' de ' + host)
  await spawnCommand('mongodump', [`-o`, dumpDir, `--uri`, uriDb])
}
