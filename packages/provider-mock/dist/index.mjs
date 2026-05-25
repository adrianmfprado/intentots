// src/index.ts
var MockProvider = class {
  name = "mock";
  async generate(input) {
    console.log(`
=== PROMPT ===
${input.prompt}

=== CONTEXT ===
`, input.context);
    return {
      text: JSON.stringify({
        success: true
      })
    };
  }
};
export {
  MockProvider
};
//# sourceMappingURL=index.mjs.map