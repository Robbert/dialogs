try {
  // See "Manual highlighting" in the Prism documentation
  // https://prismjs.com/#manual-highlighting
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
} catch (e) {
  // Ignore
}

import Prism from 'https://esm.sh/prismjs@1.30.0/components/prism-core.min.js';
import components from 'https://esm.sh/prismjs@1.30.0/components.mjs';

const baseURL = 'https://esm.sh/prismjs@1.30.0/';
customElements.define(
  'prism-syntax-highlighting',
  class PrismSyntaxHighlightingElement extends HTMLElement {
    constructor() {
      super();
      this.target = this;
      this.observer = new MutationObserver(() => {
        this.render();
      });
      this.shadow = this.attachShadow({ mode: 'open' });
      this.span = this.shadowRoot.appendChild(this.ownerDocument.createElement('span'));
      const link = this.ownerDocument.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${baseURL}themes/prism.min.css`;
      this.shadow.appendChild(link);
      this.language = this.getAttribute('language');
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
        const getPlugin = (name) => {
          let def = components.languages[name];

          // Some languages have a key in the `languages` object
          if (def) {
            return [name, def];
          }
          // Other languages don't have their own key, but they are listed under `alias` in another language object.
          else {
            const find = Object.entries(components.languages).find(
              // `alias` can be undefined, a string, or an array of strings
              ([_name, x]) => x && Array.isArray(x.alias) && x.alias.includes(name),
            );
            if (find) {
              const [_name, aliasDef] = find;
              return [_name, aliasDef];
            }
          }
          return [];
        };
        const loadDependencies = (name) => {
          let def = components.languages[name];

          if (!def) {
            const find = Object.entries(components.languages).find(([name, x]) => {
              return Array.isArray(x.alias) ? x.alias.includes(name) : x.alias === name;
            });
            if (find) {
              const [_name, aliasDef] = find;
              name = _name;
              def = aliasDef;
            }
          }
          if (components.languages[name]) {
            const require = components.languages[name].require;
            const dependencies = typeof require === 'string' ? [require] : Array.isArray(require) ? require : [];
            return Promise.all(dependencies.map((name) => loadLanguage(name)));
          }
        };

        const cache = new Map();
        const loadLanguage = async (name) => {
          const [_name] = getPlugin(name);

          await loadDependencies(_name);
          if (cache.has(_name)) {
            return cache.get(_name);
          } else {
            const loader = import(`${baseURL}components/prism-${_name}.min.js`);
            cache.set(_name, loader);
            return loader;
          }
        };
        if (this.language) {
          await loadLanguage(this.language);
          const formatted = Prism.highlight(code, Prism.languages[this.language], this.language);
          this.span.innerHTML = formatted;
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
