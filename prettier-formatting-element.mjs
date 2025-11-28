import prettier from 'https://esm.sh/prettier@3.7.1/index.mjs';
import prettierHtml from 'https://esm.sh/prettier@3.7.1/plugins/html.mjs';

customElements.define(
  'prettier-formatting',
  class PrettierFormattingElement extends HTMLElement {
    constructor() {
      super();
      this.target = this;
      this.observer = new MutationObserver(() => {
        this.render();
      });
      this.shadow = this.attachShadow({ mode: 'open' });
      this.span = this.shadowRoot.appendChild(this.ownerDocument.createElement('span'));
      this.render();
    }
    connectedCallback() {
      this.observer.observe(this, {
        characterData: true,
        subtree: true,
      });
    }
    render() {
      const code = this.textContent;
      (async () => {
        const formatted = await prettier.format(code, { parser: 'html', plugins: [prettierHtml] });
        this.span.textContent = formatted;
      })();
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
  },
);
