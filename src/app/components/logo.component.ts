import { Component, css, html, CustomElement } from '../../modules/core/index';

@Component({
  selector: 'r-logo',
  template: html`
    <h1>{{headline}}</h1>
	`,
  style: css`
	  h1 {
      font-size: 1em;
    }
    h1.is--small {
        font-size: 12px;
    }
    h1.is--medium {
        font-size: 6em;
    }
    h1.is--large {
        font-size: 12em;
    }
	`
})
class RLogoComponent extends CustomElement {
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  constructor() {
    super();
    this.state.headline = 'R';
  }
  static get observedAttributes() {
    return ['size'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(this.getAttribute('size'));
        break;
    }
  }
  setSize(size: string) {
    if (this.sizes.includes(size)) {
      for (const item in this.sizes) {
          this.shadowRoot.querySelector('h1').classList.remove(this.sizes[item]);
      }
      this.shadowRoot.querySelector('h1').classList.add(size);
    }
  }
}

customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
