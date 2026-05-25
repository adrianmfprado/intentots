import { GenerateInput, GenerateOutput, LLMProvider } from "@intentots/core"

export class MockProvider
  implements LLMProvider
{
  readonly name = 'mock'

  async generate(
    input: GenerateInput,
  ): Promise<GenerateOutput> {
    console.log(`
=== PROMPT ===
${input.prompt}

=== CONTEXT ===
`, input.context)

    return {
      text: JSON.stringify({
        success: true,
      }),
    }
  }
}