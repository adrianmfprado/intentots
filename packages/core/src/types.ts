export interface GenerateInput {
  prompt: string
  context?: unknown

  temperature?: number
  maxTokens?: number
}

export interface GenerateOutput {
  text: string

  usage?: {
    promptTokens?: number
    completionTokens?: number
  }
}

export interface LLMProvider {
  readonly name: string

  generate(
    input: GenerateInput,
  ): Promise<GenerateOutput>
}