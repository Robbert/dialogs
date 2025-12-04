customElements.define(
  'outer-html',
  class OuterHTMLElement extends HTMLElement {
    static observedAttributes = ['ref'];

    constructor() {
      super();
      this.target = this.ownerDocument.querySelector(this.getAttribute('ref'));
      this.observer = new MutationObserver(() => {
        this.render();
      });
      this.render();
    }
    connectedCallback() {
      this.observer.observe(this.target, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
    }
    render() {
      this.textContent = this.target.outerHTML;
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
  },
);
