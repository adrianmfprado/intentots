# IntentoTS

> Intent-driven programming for TypeScript.

IntentoTS is an experimental AI-native runtime for TypeScript that transforms prompts, context, and types into structured execution.

Instead of manually orchestrating:

* prompts,
* parsing,
* validation,
* retries,
* providers,

IntentoTS aims to provide a simple and elegant developer experience:

```ts id="gkrn8f"
const result = await ai.ask<Output>(
  'extract the user information',
  context
)
```

---

# Vision

IntentoTS explores a new programming paradigm:

## Intent-Driven Programming

Developers describe:

* **what** they want,
* the available **context**,
* and the expected **output contract**.

The runtime handles the rest.

---

# Current Status

⚠️ Early experimental stage.

The current version includes:

* monorepo architecture
* provider abstraction
* generic `ask<T>()` API
* mock provider
* TypeScript-first setup

Upcoming features:

* structured output validation
* schema inference
* automatic JSON repair
* provider orchestration
* context optimization
* semantic pipelines
* streaming support

---

# Example

```ts id="44f10y"
import { createIntento } from '@intentots/core'
import { MockProvider } from '@intentots/provider-mock'

type User = {
  name: string
  age: number
}

const ai = createIntento({
  provider: new MockProvider(),
})

const result = await ai.ask<User>(
  'extract user information',
  {
    text: `
      John is 32 years old.
    `,
  },
)

console.log(result)
```

---

# Project Structure

```txt id="c67w5z"
packages/
├── core/
├── provider-mock/
├── provider-openai/
├── provider-nvidia/

examples/
├── basic/
```

---

# Core Concept

IntentoTS separates:

* semantic runtime,
* provider implementations,
* validation,
* inference,
* execution.

Providers are treated as interchangeable drivers.

```txt id="65e0ew"
Intento Runtime
    ↓
Provider Adapter
    ↓
LLM API
```

---

# Goals

* AI-native developer experience
* provider-agnostic architecture
* TypeScript-first API design
* minimal boilerplate
* semantic execution primitives
* strongly typed AI outputs

---

# Development

## Install dependencies

```bash id="91wkhq"
pnpm install
```

---

## Run example

```bash id="xg1kgq"
pnpm exec tsx examples/basic/index.ts
```

---

# Planned Providers

* OpenAI
* NVIDIA
* Gemini
* Anthropic
* DeepSeek
* Ollama

---

# Inspiration

IntentoTS is inspired by the evolution of developer abstractions:

* ORMs
* query builders
* typed APIs
* reactive runtimes
* semantic systems

The goal is to make AI feel like a native programming primitive.

---

# License

MIT
