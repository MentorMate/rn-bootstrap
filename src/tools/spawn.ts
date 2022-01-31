export type SpawnOptions = {
  onProgress?: (data: string) => void
}
export function spawnProgress(
  commandLine: string,
  options: SpawnOptions = {
    onProgress: out => process.stdout.write(out)
  }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = commandLine.split(' ')
    const spawned = require('cross-spawn')(args.shift(), args, options)
    const output: string[] = []

    spawned.stdout.on('data', (data: any) => {
      data = data.toString()
      return options.onProgress ? options.onProgress(data) : output.push(data)
    })
    spawned.stderr.on('data', data => output.push(data))
    spawned.on('close', code =>
      code === 0 ? resolve(output.join('')) : reject(output.join(''))
    )
    spawned.on('error', err => reject(err))
  })
}
