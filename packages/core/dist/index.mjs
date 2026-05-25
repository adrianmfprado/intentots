// src/intento.ts
var Intento = class {
  constructor(options) {
    this.options = options;
  }
  options;
  async ask(prompt, context) {
    const response = await this.options.provider.generate({
      prompt,
      context
    });
    return JSON.parse(response.text);
  }
};
function createIntento(options) {
  return new Intento(options);
}
export {
  Intento,
  createIntento
};
//# sourceMappingURL=index.mjs.map