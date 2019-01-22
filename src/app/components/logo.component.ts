import { Component, css, html, PseudoElement, StateChange } from '@readymade/core';

@Component({
  selector: 'r-logo',
  template: html`
    <r-unit headline="{{headline}}" size="{{size}}"></r-unit>
	`,
  style: css`

	`
})
class RLogoComponent extends PseudoElement {
  setState: Function;
  getAttribute: Function;
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  public state: {
    headline: string;
  }
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
      this.setState('size', size);
    }
  }
}

customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
