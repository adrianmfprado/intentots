import fs from 'node:fs'
import path from 'node:path'

import { scanAskCalls } from './scanner'

import { generateSchema } from './generator'

export async function compileIntento() {
  const calls = scanAskCalls()
  const outputDir = '.intentots/schemas'
  const runtimeMap: Record<string, { typeId: string }> = {}

  fs.mkdirSync(outputDir, { recursive: true })

  for (const call of calls) {
    const schema = generateSchema(call)
    const fileName = `${call.typeId}.json`
    const outputPath = path.join(outputDir, fileName)
    runtimeMap[call.callSite] = {
      typeId: call.typeId,
    }

    fs.writeFileSync(
      outputPath,
      JSON.stringify(schema, null, 2),
    )

    fs.writeFileSync(
      '.intentots/runtime-map.json',
      JSON.stringify(runtimeMap, null, 2),
    )

    console.log(`Generated schema: ${fileName}`)
  }
}