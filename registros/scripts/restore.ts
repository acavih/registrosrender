import inquirer from 'inquirer'
import path from 'path'
import { readdirSync } from 'fs'
import { dbDir, dbs } from '../constants'
import spawnCommand from '../helpers/spawnCommand'

export default async function restore() {
  let i = 1
  const dirs = readdirSync(dbDir).reverse().map(d => ({
    value: d,
    name: i++ + ') ' + d
  }))

  const { dbDirNameDump, uriDb } = await inquirer.prompt([
    {
      type: 'list',
      name: 'dbDirNameDump',
      message: 'Seleccione el directorio donde se ubica la copia de seguridad:',
      choices: dirs
    },
    {
      type: 'list',
      name: 'uriDb',
      message: 'Seleccione la base de datos de la cual quiere restaurar los datos:',
      choices: dbs.map(db => ({
        value: db.uri,
        name: `(${db.alias}) -> ${db.uri}`
      }))
    }
  ])

  const { host: dbHost, pathname: nameDb } = new URL(uriDb)

  const dbDataDir = path.join(dbDir, dbDirNameDump)
  console.log('Restaurando los datos de ' + dbDataDir + ' a ' + dbHost)

  await spawnCommand('mongosh', [nameDb.replace('/', ''), '--host', dbHost, '--eval', "db.dropDatabase()"])
  await spawnCommand('mongorestore', [`--nsInclude`, nameDb.replace('/', '') + `.*`, `--host`, dbHost, '--port', "27017", dbDataDir])
}
