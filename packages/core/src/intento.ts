import type { LLMProvider } from './types'

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
    const response =
      await this.options.provider.generate({
        prompt,
        context,
      })

    return JSON.parse(response.text) as T
  }
}

export function createIntento(
  options: IntentoOptions,
) {
  return new Intento(options)
}