import { compileIntento } from '@intentots/compiler'
import { createIntento } from '@intentots/core'
import { OpenAIProvider } from '@intentots/provider-openai'
import 'dotenv/config'

type User = {
  name: string
  age: number
  profession: string
}

async function main() {
  await compileIntento()
  
  const ai = createIntento({
    provider: new OpenAIProvider({
      apiKey: process.env.OPENAI_API_KEY!,
      baseURL: process.env.OPENAI_BASE_URL,
      model: 'meta/llama-3.1-70b-instruct',
    }),
  })

  const result =
    await ai.ask<User>(
      'Extract the user information',
      {
        text: `
          John is 32 years old and is a software engineer.
        `,
      },
    )

  console.log(result)
}

main()