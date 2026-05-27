import type { LLMProvider } from './types'
import { extractJSON } from './utils/extract-json.util'
import { resolveSchema } from './utils/resolve-schema.util'

export interface IntentoOptions {
  provider: LLMProvider
}

export class Intento {
  constructor(
    private readonly options: IntentoOptions,
  ) {}

  async ask<T>(
    prompt: string,
    context?: unknown,
  ): Promise<T> {
    const schema = resolveSchema()
    console.debug('Resolved schema:', JSON.stringify(schema, null, 2))

    const finalPrompt = `
      ${prompt}

      You MUST always return valid JSON
      The result MUST be matching this schema:

      ${JSON.stringify(schema)}
    `
    const response =
      await this.options.provider.generate({
        prompt: finalPrompt ,
        context,
      })

    return extractJSON( response.text, ) as T
  }
}

export function createIntento(
  options: IntentoOptions,
) {
  return new Intento(options)
}