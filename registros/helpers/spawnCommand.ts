import child_process from 'child_process'

export default function spawnCommand(command: string, argsCommand: string[]) {
  const printCB = (data: any) => console.log(data.toString().replace('\n', ''))

  return new Promise((resolve, reject) => {
    const cmd = child_process.spawn(command, argsCommand)
    cmd.stdout.on('data', printCB)
    cmd.stderr.on('data', printCB)
    cmd.on('close', (code: number) => {
      if (code >= 1) console.log(command + ' código: ' + code)
      code === 0 ? resolve(null) : reject()
    })
  })
}
