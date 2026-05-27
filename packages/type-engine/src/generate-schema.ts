import { createGenerator, } from 'ts-json-schema-generator'

export interface GenerateSchemaOptions {
  filePath: string
  typeName: string
}

export function generateSchema(options: GenerateSchemaOptions): any {
  const generator =
    createGenerator({
      path: options.filePath,
      tsconfig:
        'tsconfig.json',
      type: options.typeName,
    })

  return generator.createSchema(
    options.typeName,
  )
}