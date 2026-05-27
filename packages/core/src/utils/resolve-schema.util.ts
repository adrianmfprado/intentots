import fs from 'node:fs'
import path from 'node:path'

export function resolveSchema() {
  const stack = new Error().stack

  console.log(stack)

  const runtimeMap = JSON.parse(fs.readFileSync('.intentots/runtime-map.json', 'utf-8'))
  const first = Object.values(runtimeMap)[0] as any

  return loadSchema(first.typeId)
}

export function loadSchema(typeId: string) {
  const schemaPath = path.resolve('.intentots/schemas', `${typeId}.json`)

  return JSON.parse(
    fs.readFileSync(schemaPath, 'utf-8'),
  )
}