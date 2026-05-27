import { createGenerator, } from 'ts-json-schema-generator'

export interface GenerateSchemaOptions {
  typeId: string
  typeName: string
  declarationFilePath: string
  callSite: string
}

export function generateSchema(options: GenerateSchemaOptions): any {
  console.debug('Generating schema for type:', JSON.stringify(options, null, 2))
  const generator =
    createGenerator({
      path: options.declarationFilePath,
      tsconfig: 'tsconfig.json',
      type: options.typeName,
      expose: 'all',
    })

  return generator.createSchema(
    options.typeName,
  )
}