const {series} = require('gulp')
const path = require('path')
const child_process = require('child_process')

require('dotenv').config({
  path: path.resolve(__dirname, 'registros-backend', '.env')
})

const { URI_DB_MONGO_REMOTE } = process.env
const { URI_DB_MONGO } = process.env
console.log(URI_DB_MONGO_REMOTE, URI_DB_MONGO)
const remoteHost = new URL(process.env.URI_DB_MONGO_REMOTE).host
const { host: localHostDB, pathname: localNameDB } = new URL(URI_DB_MONGO)

console.log(localHostDB, localNameDB.replace('/', ''))

const d = new Date()

const dateDir = [
  d.getFullYear(),
  d.getMonth().toString().padStart(2, '0'),
  d.getDate().toString().padStart(2, '0'),
  d.getHours().toString().padStart(2, '0'),
  d.getMinutes().toString().padStart(2, '0')
].join('_')

const dumpDir = path.resolve(__dirname, 'dump', dateDir)

async function backupDB() {
  console.log('Haciendo copia de seguridad en ' + dumpDir + ' de ' + remoteHost)
  await spawnCommand('mongodump', [`-o`, dumpDir, `--uri`, URI_DB_MONGO_REMOTE])
}

async function restoreDumpToLocal() {
  await spawnCommand('mongosh', [localNameDB.replace('/', ''), '--host', localHostDB, '--eval', "db.dropDatabase()"])
  await spawnCommand('mongorestore', [`--nsInclude`, localNameDB.replace('/', '') + `.*`, `--host`, localHostDB, '--port', 27017, dumpDir])
}

exports.restoreToLocal = series(backupDB, restoreDumpToLocal/*, runDevEnvironment, defaultTask*/)

function spawnCommand(command, argsCommand) {
  const printCB = (data) => console.log(data.toString().replace('\n', ''))

  return new Promise((resolve, reject) => {
    const cmd = child_process.spawn(command, argsCommand)
    cmd.stdout.on('data', printCB)
    cmd.stderr.on('data', printCB)
    cmd.on('close', code => {
      if (code >= 1) console.log(command + ' codigo: ' + code)
      code === 0 ? resolve() : reject()
    })
  })
}
