import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

@Component({
  selector: 'r-logo',
  style: css`
      :host {
        display: block;
        user-select: none;
      }
	`,
  template: html`
    <r-headline headline="{{heading}}" size="{{size}}"></r-headline>
    <r-headline headline="{{heading2}}"></r-headline>
	`
})
class RLogoComponent extends CustomElement {
  public sizes: string[] = ['is--small', 'is--medium', 'is--large'];
  public state: {
    heading: string;
    heading2: string;
    size: string;
  }
  public letters : string[];
  constructor() {
    super();
    this.state.heading = 'R';
    this.state.heading2 = 'readymade';
    // setInterval(this.update.bind(this), 4000);
  }

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'size':
        this.setSize(newValue);
        break;
    }
  }
  setSize(size: string) {
    if (this.sizes.includes(size)) {
      this.setState('size', size);
    }
  }
  update() {
    this.state.heading = Math.round(Math.random()*100).toString();
    this.state.heading2 = Math.round(Math.random()*100).toString();
  }
}

customElements.define('r-logo', RLogoComponent);

export { RLogoComponent };
