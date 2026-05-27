import OpenAI from 'openai'

import type {
  GenerateInput,
  GenerateOutput,
  LLMProvider,
} from '@intentots/core'

export interface OpenAIProviderOptions {
  apiKey: string
  baseURL?: string
  model: string
}

export class OpenAIProvider implements LLMProvider {
  readonly name = 'openai-compatible'

  private readonly client: OpenAI
  private readonly model: string

  constructor( options: OpenAIProviderOptions ) {
    this.client = new OpenAI({
      apiKey: options.apiKey,
      baseURL: options.baseURL,
    })

    this.model = options.model
  }

  async generate(input: GenerateInput): Promise<GenerateOutput> {
    const response =
      await this.client.chat.completions.create({
        model: this.model,
        temperature: input.temperature ?? 0.2,
        messages: [
          {
            role: 'system',
            content: `
              You are IntentoTS.

              You must ALWAYS return valid JSON.
              Do not explain anything.
              Do not use markdown.
              Do not wrap JSON in code blocks.
            `,
          },

          {
            role: 'user',
            content: `
              Prompt:
              ${input.prompt}

              Context:
              ${JSON.stringify(
                input.context,
                null,
                2,
              )}
            `,
          },
        ],
      })

    return {
      text: response?.choices[0]?.message.content ?? '',
    }
  }
}