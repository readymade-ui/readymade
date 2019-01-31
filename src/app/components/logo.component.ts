import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-logo',
  template: html`
    <r-headline headline="{{headline}}" size="{{size}}"></r-headline>
    <r-headline headline="{{subtitle}}"></r-headline>
	`,
  style: css`
      :host {
        display: block;
      }
	`
})
class RLogoComponent extends CustomElement {
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  public state: {
    headline: string;
    subtitle: string;
  }
  constructor() {
    super();
    this.state.headline = 'R';
    this.state.subtitle = 'readymade';
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
      this.setState('size', size);
    }
  }
}


customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
