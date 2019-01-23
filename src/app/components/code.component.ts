import { Component, css, html, PreComponent, StateChange } from './../../modules/core/index';
declare let Prism: any;

@Component({
  selector: 'r-pre',
  template: html`
    <pre class="language-js">
       <slot name="code"></slot>
    </pre>
	`,
  style: css`

	`
})
class RCodeComponent extends PreComponent {

  public state : {
    type: string;
  }
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.setState('type', this.getAttribute('type'));
        Prism.highlightAll();
        break;
    }
  }

  onInit() {
    Prism.highlightAll();
     console.log(this);
    return true;
  }
}

customElements.define('r-pre', RCodeComponent);

export { RCodeComponent };
