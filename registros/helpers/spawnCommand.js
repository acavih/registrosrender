import child_process from 'child_process'

export default function spawnCommand(command, argsCommand) {
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
