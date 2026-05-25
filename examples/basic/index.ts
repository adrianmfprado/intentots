import { createIntento } from '@intentots/core'
import { MockProvider } from '@intentots/provider-mock'

type Output = {
  success: boolean
}

async function main() {
  const ai = createIntento({
    provider: new MockProvider(),
  })

  const result =
    await ai.ask<Output>(
      'say hello',
      {
        user: 'Adrian',
      },
    )

  console.log(result)
}

main()