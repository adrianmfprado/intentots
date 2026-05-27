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

# What is IntentoTS?

IntentoTS is a TypeScript library for semantic execution powered by AI.

Instead of manually wiring complex flows, queries, integrations, heuristics, and orchestration logic, developers describe an intention, provide context, define the expected output contract, and let the runtime handle the execution.

```ts
const result = await intento.run({
  prompt: `
    Analyze this customer and identify
    possible churn risks.
  `,
  context: {
    customer,
    invoices,
    supportTickets
  },
  output: z.object({
    risk: z.enum(['low', 'medium', 'high']),
    reasons: z.array(z.string()),
    recommendedActions: z.array(z.string())
  })
})
```

IntentoTS is not an ORM, workflow engine, or chatbot wrapper.

It is a typed semantic execution runtime designed for AI-native applications.

---

# Why use IntentoTS?

Traditional code is still the best choice for:

* deterministic business rules
* calculations
* database queries
* high-performance operations
* critical workflows

But modern applications increasingly require solving problems that are semantic rather than computational.

Problems like:

* analyzing customer behavior
* understanding user intent
* detecting anomalies
* generating contextual insights
* orchestrating dynamic workflows
* combining information from multiple systems
* making decisions based on ambiguous data

These problems are expensive to solve with traditional code alone.

IntentoTS helps by turning intentions into reliable execution.

---

# The problem with raw LLM integrations

Most AI integrations today look like this:

```ts
const response = await openai.responses.create(...)
```

followed by:

* prompt engineering
* manual parsing
* JSON extraction
* validation
* retries
* cleanup logic
* orchestration code
* context management

As systems grow, this quickly becomes difficult to maintain.

---

# What IntentoTS provides

IntentoTS acts as a semantic runtime layer between your application and AI models.

It can:

* orchestrate tools automatically
* manage context intelligently
* validate outputs against schemas
* retry and self-correct invalid responses
* route execution across providers
* compose multi-step reasoning flows
* expose typed semantic capabilities
* provide observability and tracing

All while keeping a strongly typed developer experience in TypeScript.

---

# IntentoTS is not about replacing code

IntentoTS does not try to replace traditional software engineering.

Instead, it complements it.

Use traditional code for:

* deterministic logic
* critical rules
* performance-sensitive operations

Use IntentoTS for:

* semantic interpretation
* dynamic reasoning
* AI orchestration
* contextual analysis
* adaptive workflows

---

# Philosophy

Traditional software answers:

> "How should this be executed?"

IntentoTS answers:

> "What outcome are we trying to achieve?"

And transforms that intention into structured, validated, and reliable execution.

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
