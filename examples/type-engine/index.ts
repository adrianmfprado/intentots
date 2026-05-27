import { compileIntento } from '@intentots/compiler'
import { createIntento } from '@intentots/core'
import { MockProvider } from '@intentots/provider-mock'

type User = {
  name: string
  age: number
}

const ai = createIntento({
  provider: new MockProvider(),
})

async function main() {
  await compileIntento()

  await ai.ask<User>(
    'extract user',
  )
}

main()