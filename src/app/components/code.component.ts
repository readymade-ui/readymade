import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

declare let Prism: any;

@Component({
  selector: 'r-code',
  template: html`
    <pre class="language-{{type}}"><code class="language-{{type}}"></code></pre>
    <slot hidden></slot>
  `,
  style:`
    :host {
      display: block;
      padding-top: 1em;
      padding-bottom: 1em;
    }
	`
})
class RCodeComponent extends CustomElement {

  public state: {
    type: string;
  }
  constructor() {
    super();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', event => this.onSlotChange(event));
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.setState('type', this.getAttribute('type'));
        break;
    }
  }

  onSlotChange(ev: any) {
    const code = ((<any>this.shadowRoot.querySelector('slot').assignedNodes())[1].textContent);
    this.shadowRoot.querySelector('code').innerHTML = Prism.highlight(code, Prism.languages[this.getAttribute('type')], this.getAttribute('type'));
  }
}

customElements.define('r-code', RCodeComponent);

export { RCodeComponent };
