import prettier from 'https://esm.sh/prettier@3.7.1/index.mjs';
import prettierHtml from 'https://esm.sh/prettier@3.7.1/plugins/html.mjs';
import Prism from 'https://esm.sh/prismjs@1.30.0/components/prism-core.min.js';
import { baseURL, loadLanguage } from './prism-syntax-highlighting.mjs';

customElements.define(
  'code-block',
  class CodeBlockElement extends HTMLElement {
    constructor() {
      super();
      this.target = this;
      this.observer = new MutationObserver((changes) => {
        this.render();
      });
      this.shadow = this.attachShadow({ mode: 'open' });
      this.span = this.shadowRoot.appendChild(this.ownerDocument.createElement('span'));
      this.language = this.getAttribute('language');
      const link = this.ownerDocument.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseURL}themes/prism.min.css`;
      this.shadow.appendChild(link);

      this.render();
    }
    connectedCallback() {
      this.observer.observe(this, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    render() {
      let code = this.textContent;

      (async () => {
        code = await prettier.format(code, { parser: 'html', plugins: [prettierHtml] });

        if (this.language) {
          await loadLanguage(this.language);
          code = Prism.highlight(code, Prism.languages[this.language], this.language);
          this.span.innerHTML = code;
        } else {
          this.span.textContent = code;
        }
      })();
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
  },
);
