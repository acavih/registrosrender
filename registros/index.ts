import 'dotenv/config'
import { Command } from 'commander'
import dump from './scripts/dump'
import restore from './scripts/restore'

const program = new Command()

program.name('Registros utils cli')
  .description('Utilidad para hacer tareas puntuales')
// .version(version)

program.command('dump')
  .description('Crear copia de seguridad')
  .action(async () => {
    await dump()
  })

program.command('restore')
  .description('Restaurar copia de seguridad')
  .action(async () => {
    await restore()
  })

program.parse()
